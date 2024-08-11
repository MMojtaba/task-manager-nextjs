import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genericHttpResponse(status: number) {
  switch (status) {
    case 200:
      return { status: 200, message: "Success" };
    case 404:
      return { status: 404, message: "Not found" };
    case 401:
      return { status: 401, message: "Unauthorized" };
    case 500:
      return { status: 500, message: "Internal error" };
    case 400:
      return { status: 400, message: "Bad required" };
    default:
      return { status: status, message: "Error" };
  }
}

export function formatDate(date: string | Date) {
  const dateObj = new Date(date);

  const weekDay = dateObj.toLocaleString("default", { weekday: "short" });

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();

  const dateString = `${weekDay}, ${month} ${day}, ${year}`;

  return dateString;
}
