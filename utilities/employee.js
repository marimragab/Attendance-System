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
  isConfirmed = false;
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
    isConfirmed = false,
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
  let day = today.toString().split(" ")[0];
  return { day, date, time };
}
export { generateRandomCode, Employee, id, getCurrentDayAndTime };
