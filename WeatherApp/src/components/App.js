import { useState, useEffect } from "react";
import Search from "./Search";
import Weather from "./Weather";
import { fetchWeatherData } from "./utils/weatherApi";
import { convertToFlag } from "./utils/helpers";

export default function App() {
  const [location, setLocation] = useState(localStorage.getItem("location") || "lisbon");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayWeather, setDisplayWeather] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    let isActive = true;
    setError("");

    if (location.trim().length <= 1) {
      setIsLoading(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      fetchWeatherData(location)
        .then((data) => {
          if (!isActive) return;
          setDisplayWeather(`${data.location} ${convertToFlag(data.flag)}`);
          setWeather(data.weather);
          localStorage.setItem("location", location);
        })
        .catch((err) => {
          if (!isActive) return;
          setError(
            err.message === "Location not found"
              ? "Location not found. Please try another search."
              : "Unable to fetch weather data. Please check your connection and try again."
          );
        })
        .finally(() => {
          if (isActive) setIsLoading(false);
        });
    }, 1000);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [location]);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <Search location={location} setLocation={setLocation} />
      {isLoading && <p className="loader">Loading...</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {!error && weather.weathercode && (
        <Weather location={displayWeather} weather={weather} />
      )}
    </div>
  );
}
