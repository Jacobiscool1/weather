import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, (error) => {
        setError(error.message);
      });
      
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      const apiKey = '89a75113846dc8ef828a620cac633c86';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

      axios.get(apiUrl)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, [location]);

  return (
    <div className="App">
      {error && <div>Error: {error}</div>}
      {location && <div>Location: {location.latitude}, {location.longitude}</div>}
      {weatherData && (
        <div>
          <div>Current Temperature: {weatherData.main.temp}°C</div>
          <div>Weather Description: {weatherData.weather[0].description}</div>
          <div>Humidity: {weatherData.main.humidity}%</div>
        </div>
      )}
    </div>
  );
}

export default App;
