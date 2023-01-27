import {
  deleteNotification,
  getAttendanceNotifications,
  updateEmployeeAttendance,
  updateDepartureTime,
} from "./../requests/securityman.js";

import { getEmployeeData } from "./../requests/employee.js";
import { getDifferenceInHours, generateDate } from "./../utilities/employee.js";

const formalAttendanceTime = "08:30:00";
const formalDepartureTime = "15:30:00";

function getEmployeeUsernameToConfirmAttendance() {
  console.log($(this).parent());
  console.log($(this).parent().find("span:eq(0)").text());
  let username = $(this).parent().find("span:eq(0)").text();
  let day = $(this).parent().find("span:eq(1)").text();
  let date = $(this).parent().find("span:eq(2)").text();
  let time = $(this).parent().find("span:eq(3)").text();
  let notificationId = $(this).parent().find("input").val();
  let notificationData = { notificationId, day, date, time };
  localStorage.setItem("notificationData", JSON.stringify(notificationData));
  $("input[name=username]").val(username);
  $(".attendance-error").addClass("d-none");
  $(".offcanvas").offcanvas("hide");
}

function confirmAttendance() {
  if ($("input[name=username]").val() == "") {
    $(".attendance-error").removeClass("d-none");
  } else {
    $(".attendance-error").addClass("d-none");
    getEmployeeData($("input[name=username]").val()).then((employeeData) => {
      let attendnceObj = JSON.parse(localStorage.getItem("notificationData"));
      console.log(attendnceObj);
      let notificationId = Number(attendnceObj.notificationId);
      delete attendnceObj.notificationId;
      attendnceObj.arrival_time = attendnceObj.time;
      delete attendnceObj.time;
      attendnceObj.delay =
        getDifferenceInHours(attendnceObj.arrival_time, formalAttendanceTime) *
        60;
      attendnceObj.departure_time = formalDepartureTime;
      console.log(attendnceObj);

      if (employeeData[0].attendance.length == 0) {
        if (
          generateDate(attendnceObj.arrival_time) >= generateDate("10:00:00")
        ) {
          attendnceObj.status = "late";
        } else if (
          generateDate(attendnceObj.arrival_time) <=
          generateDate(formalAttendanceTime)
        ) {
          attendnceObj.status = "on-time";
          attendnceObj.delay = 0;
        }
        updateEmployeeAttendance(
          employeeData[0].id,
          employeeData[0].attendance,
          attendnceObj
        );
        deleteNotification(notificationId);
      } else {
        let attendanceArray = employeeData[0].attendance;
        console.log(employeeData[0].attendance);

        let lastDay = attendanceArray[attendanceArray.length - 1];
        if (lastDay.date == attendnceObj.date) {
          let removeLastDayFromAttendanceArray = attendanceArray.splice(
            0,
            attendanceArray.length - 1
          );
          lastDay.departure_time = attendnceObj.arrival_time;
          console.log(lastDay);
          updateDepartureTime(
            employeeData[0].id,
            removeLastDayFromAttendanceArray,
            lastDay
          );
        } else {
          updateEmployeeAttendance(
            employeeData[0].id,
            employeeData[0].attendance,
            attendnceObj
          );
        }
        deleteNotification(notificationId);
      }
    });
  }
  console.log("Confirm Attendance Clicked");
}

function checkArrivalStatus() {}

export { confirmAttendance, getEmployeeUsernameToConfirmAttendance };
