function Minutes(time: number) {
  if (time < 10) {
    return time + "0";
  } else {
    return time;
  }
}
function Hours(time: number) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}
function DateP(date: number) {
  if (date < 10) {
    return "0" + date;
  } else {
    return date;
  }
}
function Month(month: number) {
  if (month < 9) {
    return "0" + String(+month + 1);
  } else {
    return +month + 1;
  }
}
const dateParser = (date: string) => {
  const parsedDate = Date.parse(date);
  return (
    DateP(new Date(parsedDate).getDate()) +
    "." +
    Month(new Date(parsedDate).getMonth()) +
    "." +
    new Date(parsedDate).getFullYear() +
    " " +
    Hours(new Date(parsedDate).getHours()) +
    ":" +
    Minutes(new Date(parsedDate).getMinutes())
  );
};

export default dateParser;
