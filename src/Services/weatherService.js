import { DateTime } from 'luxon'

const API_KEY = 'eef2e4fb73a45a5ea83c7ba0ce45baf1'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const getWeatherData = (searchParams) => {
  const url = new URL(BASE_URL + '/weather')
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })

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

const formatWeatherData = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data

  const { main: details, icon } = weather[0]

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  }
}

const getFormattedWeatherData = async (searchParams) => {
  const formattedWeather = await getWeatherData(searchParams).then(
    formatWeatherData
  )
  return formattedWeather
}

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData

export { formatToLocalTime, iconUrlFromCode }
