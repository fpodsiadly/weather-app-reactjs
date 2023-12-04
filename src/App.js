import './App.css'
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopBar from './Components/TopBar'
import Inputs from './Components/Inputs'
import TimeAndLocation from './Components/TimeAndLocation'
import TempAndDetails from './Components/TempAndDetails'
import Forecast from './Components/Forecast'

function App() {
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopBar />
      <Inputs />

      <TimeAndLocation />
      <TempAndDetails />
      <Forecast title="hourly forecast" />
      <Forecast title="daily forecast" />
    </div>
  )
}

export default App
