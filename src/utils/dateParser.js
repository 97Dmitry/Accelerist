function Minutes(time) {
  if (time < 10) {
    return time + "0";
  } else {
    return time;
  }
}

function Hours(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}

function DateP(date) {
  if (date < 10) {
    return "0" + date;
  } else {
    return date;
  }
}

function Month(month) {
  if (month < 9) {
    return "0" + String(+month + 1);
  } else {
    return +month + 1;
  }
}

const dateParser = (date) => {
  let newDate = Date.parse(date);
  newDate =
    DateP(new Date(newDate).getDate()) +
    "." +
    Month(new Date(newDate).getMonth()) +
    "." +
    new Date(newDate).getFullYear() +
    " " +
    Hours(new Date(newDate).getHours()) +
    ":" +
    Minutes(new Date(newDate).getMinutes());
  return newDate;
};

export default dateParser;
