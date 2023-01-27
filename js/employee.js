import {
  getEmployeeData,
  notifyEmployeeArrival,
  notifyEmployeeDeparture
} from "./../requests/employee.js";
import { getCurrentDayAndTime } from "./../utilities/employee.js";

window.addEventListener("load", function () {
  let currentUser = localStorage.getItem("currentUserName");
  console.log(currentUser);
  displayCurrentEmployeeData(currentUser);

  $("#arrival-btn").click(recordArrival);
  $("#departure-btn").click(recordDeparture);
  
  if (localStorage.getItem("arrived")) {
    $("#arrival-btn").addClass("disabled");
    $("#departure-btn").removeClass("disabled");
  }

  if (localStorage.getItem("departed")) {
    $("#departure-btn").addClass("disabled");
  }
});

async function displayCurrentEmployeeData(username) {
  let employee = await getEmployeeData(username);
  console.log(employee);
  $(".employee-image").prop("src", employee[0].avatar);
  $(".employee-name").html(`${employee[0].firstname} ${employee[0].lastname}`);
  $(".employee-email").html(employee[0].email);
}

function recordArrival() {
  console.log("Arrived");
  $("#arrival-btn").addClass("disabled");
  localStorage.setItem("arrived", true);
  localStorage.removeItem('departed')
  let arrivalData = getCurrentDayAndTime();
  arrivalData.username = localStorage.getItem("currentUserName");
  notifyEmployeeArrival(arrivalData);
  console.log(arrivalData);
}

function recordDeparture() {
  $("#arrival-btn").removeClass("disabled");
  $("#departure-btn").addClass("disabled");
  localStorage.removeItem('arrived')
  localStorage.setItem('departed',true)
  let departureData = getCurrentDayAndTime();
  departureData.username = localStorage.getItem("currentUserName");
  notifyEmployeeDeparture(departureData);
}
