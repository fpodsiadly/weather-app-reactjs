import './App.css'
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopBar from './Components/TopBar'
import Inputs from './Components/Inputs'
import TimeAndLocation from './Components/TimeAndLocation'
import TempAndDetails from './Components/TempAndDetails'
import Forecast from './Components/Forecast'
import getFormattedWeatherData from './Services/weatherService'
import { useEffect, useState } from 'react'
function App() {
  const [query, setQuery] = useState({ q: 'lodz' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data)
      })
    }
    fetchWeather()
  }, [query, units])

  return (
    <div className="mx-auto max-w-screen-md mt-4 pt-5 pb-10 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopBar />
      <Inputs />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} />

          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </>
      )}
    </div>
  )
}

export default App
