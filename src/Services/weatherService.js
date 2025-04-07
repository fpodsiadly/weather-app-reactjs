import { DateTime } from 'luxon'

const API_KEY = 'd07db1c6fa6f4848b35134556250704'
const BASE_URL = 'https://api.weatherapi.com/v1'

const getWeatherData = (endpoint, params) => {
  const url = new URL(`${BASE_URL}/${endpoint}.json`)
  url.search = new URLSearchParams({ key: API_KEY, ...params })

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`)
      }
      return res.json()
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error)
      throw error
    })
}

const formatCurrentWeather = (data) => {
  const {
    location: { name, country, tz_id: timezone },
    current: {
      temp_c: temp,
      feelslike_c: feels_like,
      humidity,
      wind_kph: speed,
      condition: { text: details, icon },
      last_updated_epoch: dt,
    },
  } = data

  return {
    name,
    country,
    timezone,
    temp,
    feels_like,
    humidity,
    speed,
    details,
    icon,
    dt,
  }
}

const formatForecastWeather = (data) => {
  const {
    forecast: { forecastday },
  } = data

  const daily = forecastday.map((day) => {
    return {
      date: day.date,
      max_temp: day.day.maxtemp_c,
      min_temp: day.day.mintemp_c,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    }
  })

  const hourly = forecastday[0].hour.map((hour) => {
    return {
      time: hour.time_epoch,
      temp: hour.temp_c,
      condition: hour.condition.text,
      icon: hour.condition.icon,
    }
  })

  return { daily, hourly }
}

const getFormattedWeatherData = async (params) => {
  const currentWeather = await getWeatherData('current', params).then(
    formatCurrentWeather
  )

  const forecastWeather = await getWeatherData('forecast', {
    ...params,
    days: 3, // Free plan allows up to 3 days of forecast
  }).then(formatForecastWeather)

  return { ...currentWeather, ...forecastWeather }
}

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  if (!secs || typeof secs !== 'number') {
    console.warn('Invalid time input for formatToLocalTime:', secs)
    return 'Invalid time'
  }
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
}

export default getFormattedWeatherData
export { formatToLocalTime }
