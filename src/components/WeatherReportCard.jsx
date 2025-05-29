import React, { useState } from 'react';
import axios from 'axios';
import {
  WiStrongWind,
  WiHumidity,
  WiBarometer,
  WiThermometer,
} from 'react-icons/wi';
import ForecastChart from './ForecastChart';

function WeatherReportCard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/weather/', {
        params: { city },
      });
      setWeather(res.data);
      setError('');
    } catch (err) {
      setError('City not found', err);
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-10">
      <h1 className="text-4xl font-bold mb-6">🌦️ City Report</h1>

      <div className="flex gap-4 mb-6">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-2 rounded-md border border-gray-300 shadow-sm"
        />
        <button
          onClick={getWeather}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Get Report
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-blue-700">{weather.city}</h2>
              <p className="text-gray-600 capitalize">{weather.description}</p>
            </div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
              className="w-20 h-20"
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center text-gray-700">
              <WiThermometer className="text-3xl text-blue-500 mr-2" />
              <span className="text-lg">{weather.temperature}°C</span>
            </div>

            <div className="flex items-center text-gray-700">
              <WiHumidity className="text-3xl text-blue-500 mr-2" />
              <span className="text-lg">{weather.humidity}% Humidity</span>
            </div>

            <div className="flex items-center text-gray-700">
              <WiStrongWind className="text-3xl text-blue-500 mr-2" />
              <span className="text-lg">{weather.wind_speed} m/s Wind</span>
            </div>

            <div className="flex items-center text-gray-700">
              <WiBarometer className="text-3xl text-blue-500 mr-2" />
              <span className="text-lg">{weather.pressure} hPa</span>
            </div>
          </div>
        </div>
        <ForecastChart city={weather.city} />
        </>
      )}
    </div>
  );
}

export default WeatherReportCard;
