import React from "react";
import Day from "./Day";

function getPersonalizedTips({ weathercode, temperature_2m_max, temperature_2m_min }) {
  const tips = [];
  const rainyDays = weathercode.filter(
    (code) => (code >= 51 && code <= 67) || (code >= 80 && code <= 82)
  ).length;
  const snowyDays = weathercode.filter(
    (code) => (code >= 71 && code <= 77) || code === 85 || code === 86
  ).length;
  const stormyDays = weathercode.filter((code) => code >= 95 && code <= 99).length;
  const hottestTemperature = Math.max(...temperature_2m_max);
  const coldestTemperature = Math.min(...temperature_2m_min);
  const hasClearWeather = weathercode.some((code) => code <= 1);

  if (rainyDays) {
    tips.push({
      icon: "☔",
      title: "Rain in the forecast",
      description: `Rain or showers are expected on ${rainyDays} day${rainyDays === 1 ? "" : "s"}. Pack an umbrella or waterproof layer.`,
    });
  }

  if (stormyDays) {
    tips.push({
      icon: "⛈️",
      title: "Thunderstorms possible",
      description: `Thunderstorms are forecast on ${stormyDays} day${stormyDays === 1 ? "" : "s"}. Check local alerts and plan indoor alternatives.`,
    });
  }

  if (snowyDays) {
    tips.push({
      icon: "❄️",
      title: "Prepare for snow",
      description: `Snow is forecast on ${snowyDays} day${snowyDays === 1 ? "" : "s"}. Dress warmly and allow extra time when traveling.`,
    });
  }

  if (hottestTemperature >= 30) {
    tips.push({
      icon: "🧴",
      title: "Plan for warm temperatures",
      description: `Temperatures may reach ${Math.round(hottestTemperature)}°. Bring water, sunscreen, and light clothing.`,
    });
  }

  if (coldestTemperature <= 5) {
    tips.push({
      icon: "🧥",
      title: "Pack a warm layer",
      description: `Temperatures may drop to ${Math.round(coldestTemperature)}°. A warm jacket will help you stay comfortable.`,
    });
  }

  if (hasClearWeather) {
    tips.push({
      icon: "☀️",
      title: "Make time for the outdoors",
      description: "Clear weather is in the forecast. Consider planning outdoor activities on the brighter days.",
    });
  }

  if (!tips.length) {
    tips.push({
      icon: "🧳",
      title: "Comfortable conditions ahead",
      description: "No extreme temperatures or precipitation are forecast. Comfortable walking shoes and light layers should work well.",
    });
  }

  return tips;
}

export default function Weather({ location, weather }) {
  const { temperature_2m_max: max, weathercode: code, temperature_2m_min: min, time: dates } = weather;
  const tips = getPersonalizedTips(weather);

  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            key={date}
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            isToday={i === 0}
            code={code.at(i)}
          />
        ))}
      </ul>
      <section className="travel-tips" aria-labelledby="travel-tips-heading">
        <h3 id="travel-tips-heading">Personalized Travel Tips</h3>
        <ul className="travel-tips-list">
          {tips.map((tip) => (
            <li className="travel-tip" key={tip.title}>
              <span className="travel-tip-icon" aria-hidden="true">{tip.icon}</span>
              <div>
                <h4>{tip.title}</h4>
                <p>{tip.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
