import { isEmployee, getEmployeeData } from "./employee.js";

const url = "http://localhost:3000";

async function getAdminData() {
  const res = await fetch(`${url}/admin`);
  const adminData = await res.json();
  return adminData;
}

async function getAllEmployees() {
  let response = await fetch(`${url}/employees`);
  let allEmployees = await response.json();
  return allEmployees;
}

async function getRegisterationNotifications() {
  let response = await fetch(`${url}/registeration-notifications`);
  let allNotifications = await response.json();
  return allNotifications;
}

async function confirmEmployee(username) {
  let data;
  try {
    let employee = await getEmployeeData(username);
    console.log(employee);
    if (employee.length > 0) {
      let res = await fetch(`${url}/employees/${employee[0].id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isconfirmed: true }),
      });
      data = res.json();
    }
  } catch (error) {
    console.log("There is an error", error);
  }
  console.log(data);
  return data;
}

async function deleteNotification(id) {
  try {
    let res = await fetch(`${url}/registeration-notifications/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("There is an error", error);
  }
}

async function deleteEmployee(username) {
  try {
    let employee = await getEmployeeData(username);
    console.log(employee);
    if (employee.length > 0) {
      let res = await fetch(`${url}/employees/${employee[0].id}`, {
        method: "DELETE",
      });
    }
  } catch (error) {
    console.log("There is an error", error);
  }
}

export {
  getAdminData,
  getAllEmployees,
  getRegisterationNotifications,
  confirmEmployee,
  deleteNotification,
  deleteEmployee
};
