import { getEmployeeData } from "./../requests/employee.js";
import { getAttendanceNotifications} from "./../requests/securityman.js";
import{confirmAttendance,getEmployeeUsernameToConfirmAttendance} from "./attendance.js"

$(function () {
  let currentuser = localStorage.getItem("currentUserName");
  console.log(currentuser);

  getEmployeeData(currentuser).then((securitymanData) => {
    console.log(securitymanData);
    $(".employee-image").prop("src", securitymanData[0].avatar);
    document.querySelector(
      ".securityman-name"
    ).innerText = `${securitymanData[0].firstname} ${securitymanData[0].lastname}`;
    document.querySelector(
      ".securityman-email"
    ).innerText = `${securitymanData[0].email}`;
  });
  displayAttendanceNotifications();
  $("#confirm-attendance").on("click", confirmAttendance);
});

async function getCurrentUserData() {
  let currentuser = localStorage.getItem("currentUserName");
  console.log(currentuser);

  let securitymanData = await getEmployeeData(currentuser);
  console.log(securitymanData[0]);
  return securitymanData[0];
}

async function displayAttendanceNotifications() {
  let attendanceNotifications = await getAttendanceNotifications();
  $("#notifications-number").html(attendanceNotifications.length);
  $.each(attendanceNotifications, function (index, value) {
    // console.log(value)
    let confirmButton = $(
      `<button class="btn btn-outline-success btn-sm me-1" type="button">Choose</button>`
    );
    const notification = $(
      ` <div class="card card-body mb-2"> <span class="text-primary">${value.username}</span><p>has arrived <span> ${value.day}day</span> <span> ${value.date}</span> at <span> ${value.time}</span> </p></div>`
    );
    $(notification).append(confirmButton);
    $("#attendance-notifications").append(notification);

    $(notification).on(
      "click",
      "button",
      getEmployeeUsernameToConfirmAttendance
    );
  });
}

