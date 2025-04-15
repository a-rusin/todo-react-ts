export function formatDateString(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);

  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const monthName = monthNames[month - 1];

  return `${day} ${monthName}, ${year} г.`;
}
