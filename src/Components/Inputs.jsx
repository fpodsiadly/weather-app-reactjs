import React, { useState } from 'react'
import { UilSearch, UilLocationPinAlt } from '@iconscout/react-unicons'
import { ToastContainer, toast } from 'react-toastify'

const Inputs = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    if (city !== '') setQuery({ q: city })
  }

  const handleLocation = () => {
    if (navigator.geolocation) {
      toast.info('Getting your location...')
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Got your location!')
        setQuery({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      })
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleUnits = (e) => {
    if (units !== e.target.name) setUnits(e.target.name)
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onKeyDown={handleEnter}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search for city..."
          className="text-xl font-light p-2 shadow-xl focus:outline capitalize placeholder:lowercase"
        />
        <UilSearch
          size="25"
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearch}
        />
        <UilLocationPinAlt
          size="25"
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocation}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnits}
        >
          °C
        </button>
        <p className="text-xl text-white mx-2 ">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnits}
        >
          °F
        </button>
      </div>
    </div>
  )
}

export default Inputs
