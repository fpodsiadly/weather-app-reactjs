import React from 'react'

const Forecast = ({ title, items }) => {
  const currentHour = new Date().getHours()
  const filteredItems =
    title === 'Hourly Forecast'
      ? items
          .filter((item) => {
            const itemHour = new Date(item.time * 1000).getHours()
            return itemHour >= currentHour
          })
          .slice(0, 6) // Show only the next 8 hours
      : items

  return (
    <div className="mt-6">
      <div className="flex items-center justify-start">
        <p className="text-white font-medium uppercase tracking-wider text-lg">
          {title}
        </p>
      </div>
      <hr className="my-2 border-gray-400" />
      <div className="grid grid-cols-6 gap-4 text-white">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <p className="font-light text-sm mb-2">
              {title === 'Hourly Forecast'
                ? new Date(item.time * 1000).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : item.date}
            </p>
            <img
              src={item.icon}
              alt={item.condition}
              className="w-10 h-10 mb-2"
            />
            <p className="font-medium text-lg">{`${Math.round(
              item.temp || item.max_temp
            )}°`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
