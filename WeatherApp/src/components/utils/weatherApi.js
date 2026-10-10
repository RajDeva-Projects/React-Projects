export async function fetchWeatherData(location) {
  // Geocoding
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}`
  );
  if (!geoRes.ok) throw new Error("Weather API request failed");

  const geoData = await geoRes.json();
  if (!geoData.results?.length) throw new Error("Location not found");

  const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);

  // Weather
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
  );
  if (!weatherRes.ok) throw new Error("Weather API request failed");

  const weatherData = await weatherRes.json();

  return {
    location: `${name} ${country_code}`,
    weather: weatherData.daily,
    flag: country_code,
  };
}
