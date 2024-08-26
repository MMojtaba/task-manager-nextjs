export function genericHttpResponse(status: number, msg?: string | undefined) {
  switch (status) {
    case 200:
      return { status: 200, message: msg ?? "Success" };
    case 404:
      return { status: 404, message: msg ?? "Not found" };
    case 401:
      return { status: 401, message: msg ?? "Unauthorized" };
    case 500:
      return { status: 500, message: msg ?? "Internal error" };
    case 400:
      return { status: 400, message: msg ?? "Bad request" };
    default:
      return { status: status, message: msg ?? "Error" };
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
