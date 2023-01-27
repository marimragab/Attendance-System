import { Employee } from "../utilities/employee.js";

const url = "http://localhost:3000";

function addEmployee(
  username,
  password,
  firstname,
  lastname,
  address,
  email,
  age,
  role = "employee"
) {
  let newEmployee = new Employee(
    username,
    password,
    firstname,
    lastname,
    address,
    email,
    age,
    role
  );
  fetch(" http://localhost:3000/employees", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEmployee),
  }).then((res) => console.log(res));
}

async function isDuplicateEmail(email) {
  let flag = false;
  const url = "http://localhost:3000";
  const data = await fetch(`${url}/employees?email=${email}`);
  const employee = await data.json();
  if (employee.length > 0) flag = true;
  return flag;
}

async function isEmployee(username) {
  let flag = false;
  const data = await fetch(`${url}/employees?username=${username}`);
  const employee = await data.json();
  if (employee.length > 0) flag = true;
  return flag;
}

function notifyNewEmployeeRegisteration(username) {
  fetch(`${url}/registeration-notifications`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
}

async function isExistEmployee(username, password) {
  const data = await fetch(
    `${url}/employees?username=${username}&&password=${password}`
  );
  const employee = await data.json();
  return employee;
}

async function getEmployeeData(username) {
  let employee;
  try {
    const data = await fetch(`${url}/employees?username=${username}`);
    employee = await data.json();
  } catch (error) {
    console.log(error);
  }
  // console.log(employee)
  if (employee.length > 0) return employee;
  else throw new Error("Employee not found");
}

function notifyEmployeeArrival(arrivalData){
  fetch(`${url}/attendance-notifications`,{
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrivalData),
  }).then(res=>res.json())
  .then(data=>console.log(data))
  .catch(error=>console.log(error))
}

function notifyEmployeeDeparture(departureData){
  fetch(`${url}/departure-notifications`,{
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(departureData),
  }).then(res=>res.json())
  .then(data=>console.log(data))
  .catch(error=>console.log(error))
}




export {
  addEmployee,
  isDuplicateEmail,
  notifyNewEmployeeRegisteration,
  isExistEmployee,
  getEmployeeData,
  isEmployee,
  notifyEmployeeArrival,notifyEmployeeDeparture
};
