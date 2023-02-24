const numbers = "0123456789";

function generateRandomCode(length) {
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    randomCode += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return randomCode;
}

function generateId() {
  let id = 28;
  return function () {
    return ++id;
  };
}

const id = generateId();
class Employee {
  username;
  password;
  firstname;
  lastname;
  address;
  email;
  age;
  role;
  isconfirmed = false;
  attendance = [];
  avatar =
    "https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png";
  constructor(
    username,
    password,
    firstname,
    lastname,
    address,
    email,
    age,
    role,
    isconfirmed = false,
    attendance = [],
    avatar = "https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png"
  ) {
    (this.username = username),
      (this.password = password),
      (this.firstname = firstname),
      (this.lastname = lastname),
      (this.address = address),
      (this.email = email),
      (this.age = age),
      (this.role = role);
  }
}

function getCurrentDayAndTime() {
  const today = new Date();
  let date =
    today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate();
  let time = today.toString().split(" ")[4];
  let day = today.toString().split(" ")[0] + "day";
  return { day, date, time };
}

function getDifferenceInHours(time1, time2) {
  let date1 = generateDate(time1);
  let date2 = generateDate(time2);
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
}

function generateDate(time) {
  let splittedTime = time.split(":");
  let hours = splittedTime[0];
  let minutes = splittedTime[1];
  let seconds = splittedTime[2];
  const date = new Date();
  date.setHours(hours, minutes, seconds);
  return date;
}

function getTodayDate() {
  const today = new Date();
  const todayDate = today.toISOString().slice(0, 10);
  return todayDate;
}

function logout() {
  window.location.href = "http://127.0.0.1:5500/attendance_website/login.html";
  // localStorage.removeItem("currentUserName");
  // localStorage.clear()
}

function formatTime(timeString) {
  const time = new Date(`1970-01-01T${timeString}Z`);
  if (isNaN(time.getTime())) {
    console.error(`Invalid time string: ${timeString}`);
    return "";
  }
  const hours = time.getHours();
  const minutes = time.getMinutes();
  if (isNaN(minutes)) {
    console.error(`Invalid time string: ${timeString}`);
    return "";
  }
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours
    .toString()
    .padStart(2, "0")}:${formattedMinutes} ${ampm}`;
  return formattedTime;
}

export {
  generateRandomCode,
  Employee,
  id,
  getCurrentDayAndTime,
  getDifferenceInHours,
  generateDate,
  getTodayDate,
  logout,
  formatTime,
};
