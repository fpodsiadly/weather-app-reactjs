import './App.css'
import TopBar from './Components/TopBar'
import Inputs from './Components/Inputs'
import TimeAndLocation from './Components/TimeAndLocation'
import TempAndDetails from './Components/TempAndDetails'
import getFormattedWeatherData from './Services/weatherService'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [query, setQuery] = useState({ q: 'lodz' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    let isCancelled = false

    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'
      toast.info('Fetching weather for ' + message)
      try {
        const data = await getFormattedWeatherData({ ...query, units })
        if (!isCancelled) {
          toast.success('Weather fetched successfully!')
          setWeather(data)
        }
      } catch (error) {
        if (!isCancelled) {
          toast.error('Failed to fetch weather data. Please try again.')
        }
      }
    }

    fetchWeather()

    return () => {
      isCancelled = true
    }
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopBar setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} />
          {/* Forecast components removed as hourly and daily data are no longer available */}
        </>
      )}
      <ToastContainer autoClose={2000} theme="colored" newestOnTop={true} />
    </div>
  )
}

export default App
