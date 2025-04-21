export const getCurrentDate = (
  dateString: string,
  displayTime: boolean
): string => {
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

  const date = new Date(parseInt(dateString));
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  if (displayTime) {
    return `${day} ${monthNames[month]}, ${year} | ${hour}:${getCorectFormat(
      minutes
    )}`;
  } else {
    return `${day} ${monthNames[month]}, ${year}`;
  }
};

const getCorectFormat = (num: number): string =>
  num.toString().length === 1 ? num + "0" : num.toString();
