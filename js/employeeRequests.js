import { Employee } from "./employee.js";

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
  const data = await fetch(`http://localhost:3000/employees?email=${email}`);
  const employee = await data.json();
  if (employee.length > 0) flag = true;
  return flag;
}

function notifyNewEmployeeRegisteration(username) {
  fetch("http://localhost:3000/notifications", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username}),
  });
}

export { addEmployee, isDuplicateEmail ,notifyNewEmployeeRegisteration};
