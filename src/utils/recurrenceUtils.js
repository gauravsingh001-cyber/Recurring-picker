import {
  format,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isAfter
} from "date-fns";

export function generateRecurringDates({
  frequency,
  interval,
  selectedDays = [],
  startDate,
  endDate,
  monthlyDate = 1 // ✅ NEW
}) {
  if (!startDate) return [];

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : addYears(start, 1);
  const dates = [];
  let current = new Date(start);

  while (!isAfter(current, end)) {
    if (frequency === "Daily") {
      dates.push(format(current, "yyyy-MM-dd"));
      current = addDays(current, interval);
    } else if (frequency === "Weekly") {
      for (let i = 0; i < 7; i++) {
        const temp = addDays(current, i);
        if (selectedDays.includes(temp.getDay()) && !isAfter(temp, end)) {
          dates.push(format(temp, "yyyy-MM-dd"));
        }
      }
      current = addWeeks(current, interval);
    } else if (frequency === "Monthly") {
      const tempDate = new Date(current.getFullYear(), current.getMonth(), 1);
      const daysInMonth = new Date(
        tempDate.getFullYear(),
        tempDate.getMonth() + 1,
        0
      ).getDate();

      const day = Math.min(monthlyDate || 1, daysInMonth);
      const validDate = new Date(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        day
      );

      if (!isAfter(validDate, end)) {
        dates.push(format(validDate, "yyyy-MM-dd"));
      }

      current = addMonths(current, interval);
    } else if (frequency === "Yearly") {
      dates.push(format(current, "yyyy-MM-dd"));
      current = addYears(current, interval);
    } else {
      break;
    }
  }

  return dates;
}
