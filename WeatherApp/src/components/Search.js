import React from "react";

export default function Search({ location, setLocation }) {
  return (
    <input
      type="text"
      placeholder="Search for location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
  );
}
