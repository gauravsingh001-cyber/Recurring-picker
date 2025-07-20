import React from "react";

export default function CalendarPreview({ dates }) {
  return (
    <div>
      <h2>Selected Dates:</h2>
      <ul>
        {dates.map((d, idx) => (
          <li key={idx}>{d}</li>
        ))}
      </ul>
    </div>
  );
}
