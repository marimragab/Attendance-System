import {
  getAttendanceNotifications,
  updateEmployeeAttendance,
} from "./../requests/securityman.js";

import {getEmployeeData} from "./../requests/employee.js"
const formalAttendanceTime = "08:30:00";
const formalDepartureTime = "15:30:00";

function getEmployeeUsernameToConfirmAttendance() {
  console.log($(this).parent());
  console.log($(this).parent().find("span:eq(0)").text());
  let username = $(this).parent().find("span:eq(0)").text();
  let day = $(this).parent().find("span:eq(1)").text();
  let date = $(this).parent().find("span:eq(2)").text();
  let time = $(this).parent().find("span:eq(3)").text();
  let notificationData = { day, date, time };
  localStorage.setItem("notificationData", JSON.stringify(notificationData));
  $("input[name=username]").val(username);
  $(".attendance-error").addClass("d-none");
  $('.offcanvas').offcanvas('hide');
}

function confirmAttendance() {
  if ($("input[name=username]").val() == "") {
    $(".attendance-error").removeClass("d-none");
  } else {
    $(".attendance-error").addClass("d-none");
    getEmployeeData($("input[name=username]").val()).then((employeeData) => {
      console.log(employeeData);
      console.log(employeeData[0].attendance.length == 0);
      let attendnceObj = JSON.parse(localStorage.getItem("notificationData"));
      if (employeeData[0].attendance.length == 0) {
        updateEmployeeAttendance(
          employeeData[0].id,
          employeeData[0].attendance,
          attendnceObj
        );
      }
    });
  }
  console.log("Confirm Attendance Clicked");
}

function checkArrivalStatus() {}

export { confirmAttendance ,getEmployeeUsernameToConfirmAttendance};
