import React, { useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-200 text-black p-4 rounded shadow-md text-sm">
        <p className="font-semibold">{label}</p>
        <p>🌡️ Temp: {data.temp}°C</p>
        <p>🤒 Feels Like: {data.feels_like}°C</p>
        <p>💧 Humidity: {data.humidity}%</p>
        <p>🌬️ Wind: {data.wind_speed} m/s</p>
        <p>🧭 Pressure: {data.pressure} hPa</p>
        <p className="capitalize">☁️ {data.description}</p>
      </div>
    );
  }

  return null;
};

export default function ForecastChart({ city }) {
  const [data, setData] = useState([]);
  console.log("city", city);
  
  React.useEffect(() => {
    if (!city) return;

    axios
      .get('http://localhost:8000/api/forecast/', { params: { city } })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [city]);

  return (
    <div className="mt-6 p-4 rounded shadow w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center ">📈 The next 5-day prediction in {city}</h2>
      <ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
    <XAxis
      dataKey="datetime"
      tickFormatter={(str) => str.split(' ')[0]}
      tick={{ fill: '#ffffff' }}
    />
    <YAxis unit="°C" tick={{ fill: '#ffffff' }} />
    <Tooltip content={<CustomTooltip />} />
    <Line type="monotone" dataKey="temp" stroke="#90cdf4" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>
    </div>
  );
}
