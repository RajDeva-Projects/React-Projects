import React from "react";
import { getWeatherIcon, formatDay } from "./utils/helpers";

export default function Day({ date, isToday, max, min, code }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(max)}° - <strong>{Math.ceil(min)}°</strong>
      </p>
    </li>
  );
}
