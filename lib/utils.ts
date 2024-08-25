import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDate(dateString: string): string {
  const [day, month, year] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export const formatDateForInput = (date: string) => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

export function formatDateTime(dateString: string) {
  // Parse the date string
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1; // Months are 0-based in JavaScript
  const day = parseInt(dateString.slice(6, 8), 10);
  const hours = parseInt(dateString.slice(8, 10), 10);
  const minutes = parseInt(dateString.slice(10, 12), 10);
  const seconds = parseInt(dateString.slice(12, 14), 10);

  const date = new Date(year, month, day, hours, minutes, seconds);
  const now = new Date();

  // Check if the date is today
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    // Format the time as 10:00 am
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const period = hours >= 12 ? "pm" : "am";
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  // Check if the date is in the same week as today
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Get the start of the week (Sunday)
  const isSameWeek = date >= startOfWeek && date <= now;

  if (isSameWeek) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  // Otherwise, return the date as 11 Aug, 20 Dec
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("en-US", options);
}

export function formatDate(inputDate: string) {
  const [day, month, year] = inputDate.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return "Today";
  }

  if (date.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }

  const dayOfMonth = date.getDate();

  const options: Intl.DateTimeFormatOptions = { weekday: "short" };
  const weekday = date.toLocaleDateString("en-US", options);

  return `${dayOfMonth} ${weekday}`;
}
