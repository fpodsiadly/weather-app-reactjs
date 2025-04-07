import React from 'react'
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from '@iconscout/react-unicons'
import { formatToLocalTime } from '../Services/weatherService'

const TempAndDetails = ({
  weather: {
    details = 'N/A',
    icon = '',
    temp = 0,
    temp_min = 0,
    temp_max = 0,
    sunrise = 0,
    sunset = 0,
    speed = 0,
    humidity = 0,
    feels_like = 0,
    timezone = 'UTC',
  } = {},
}) => {
  return (
    <div className="text-white">
      <div className="flex items-center justify-center py-6 text-2xl font-semibold text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={icon} alt={details} className="w-24 h-24" />
        <p className="text-6xl font-bold">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center">
            <UilTemperature size="18" className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center">
            <UilTear size="18" className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center">
            <UilWind size="18" className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-4 text-sm py-3">
        <div className="flex items-center space-x-1">
          <UilSun />
          <p className="font-light">
            Rise:
            <span className="font-medium ml-1">
              {formatToLocalTime(sunrise, timezone, 'hh:mm a')}
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <UilSunset />
          <p className="font-light">
            Set:
            <span className="font-medium ml-1">
              {formatToLocalTime(sunset, timezone, 'hh:mm a')}
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <UilArrowUp />
          <p className="font-light">
            High:
            <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <UilArrowDown />
          <p className="font-light">
            Low:
            <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TempAndDetails
