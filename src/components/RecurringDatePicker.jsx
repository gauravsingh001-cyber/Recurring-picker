import React, { useState } from "react";
import CalendarPreview from "./CalendarPreview";
import { generateRecurringDates } from "../utils/recurrenceUtils";

const frequencyOptions = ["Daily", "Weekly", "Monthly", "Yearly"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function RecurringDatePicker() {
  const [frequency, setFrequency] = useState("Daily");
  const [interval, setInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyTime, setDailyTime] = useState("16:00");
  const [monthlyDate, setMonthlyDate] = useState(10);
  const [dates, setDates] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleGenerate = () => {
    const recurringDates = generateRecurringDates({
      frequency,
      interval: Math.max(1, parseInt(interval) || 1),
      selectedDays,
      startDate,
      endDate,
      dailyTime,
      monthlyDate,
    });
    setDates(recurringDates);
  };

  return (
    <div className="picker-container">
      <label>
        Recurring Frequency:
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          {frequencyOptions.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>

      <label>
        Repeat Every:
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) =>
            setInterval(e.target.value === "" ? "" : Math.max(1, Number(e.target.value)))
          }
          placeholder="e.g. 1"
        />
      </label>

      {frequency === "Daily" && (
        <label>
          Time of Day:
          <input
            type="time"
            value={dailyTime}
            onChange={(e) => setDailyTime(e.target.value)}
          />
        </label>
      )}

      {frequency === "Weekly" && (
        <div className="day-selector">
          <span>Select Days of Week:</span>
          <div className="day-buttons">
            {weekdays.map((day, idx) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(idx)}
                className={selectedDays.includes(idx) ? "selected" : ""}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {frequency === "Monthly" && (
        <label>
          Day of Month (1-31):
          <input
            type="number"
            min="1"
            max="31"
            value={monthlyDate}
            onChange={(e) => setMonthlyDate(Number(e.target.value))}
          />
        </label>
      )}

      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>

      <label>
        End Date (optional):
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>

      <button onClick={handleGenerate} className="generate-button">
        Generate Recurring Dates
      </button>

      {dates.length > 0 && (
        <div className="calendar-preview">
          <CalendarPreview dates={dates} />
        </div>
      )}
    </div>
  );
}
