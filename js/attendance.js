import {
  deleteNotification,
  getAttendanceNotifications,
  updateEmployeeAttendance,
  updateDepartureTime,
  deleteDepartureNotification,
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
      attendnceObj.departure_time = formalDepartureTime;
      console.log(attendnceObj);

      if (employeeData[0].attendance.length > 0) {
        let attendanceArray = employeeData[0].attendance;
        console.log(employeeData[0].attendance);

        let lastDay = attendanceArray[attendanceArray.length - 1];
        console.log(lastDay, attendnceObj);
        if (lastDay.date.trim() == attendnceObj.date.trim()) {
          let removeLastDayFromAttendanceArray = attendanceArray.splice(
            0,
            attendanceArray.length - 1
          );
          console.log(lastDay,"before")

          lastDay.departure_time = attendnceObj.arrival_time;
          console.log(lastDay, removeLastDayFromAttendanceArray);
          console.log(lastDay,"after")
          let departureStatus=checkDepartureTime(lastDay.departure_time);
          lastDay = { ...lastDay, ...departureStatus };
          updateDepartureTime(
            employeeData[0].id,
            removeLastDayFromAttendanceArray,
            lastDay
          );
          deleteDepartureNotification(notificationId);
        } else {
          let status = checkArrivalStatus(attendnceObj.arrival_time);
          console.log(status);
          attendnceObj = { ...attendnceObj, ...status };
          console.log(attendnceObj);
          updateEmployeeAttendance(
            employeeData[0].id,
            employeeData[0].attendance,
            attendnceObj
          );
          deleteNotification(notificationId);
        }
       
      } else {
        let status = checkArrivalStatus(attendnceObj.arrival_time);
        console.log(status);
        attendnceObj = { ...attendnceObj, ...status };
        console.log(attendnceObj);
        updateEmployeeAttendance(
          employeeData[0].id,
          employeeData[0].attendance,
          attendnceObj
        );
        // deleteDepartureNotification(notificationId);
        deleteNotification(notificationId);
      }
    });
  }
}

function checkArrivalStatus(arrivalTime) {
  if (generateDate(arrivalTime.trim()) >= generateDate(formalAttendanceTime)) {
    return {
      status: "late",
      delay: getDifferenceInHours(arrivalTime, formalAttendanceTime) * 60,
    };
  } else {
    return { status: "on-time", delay: 0 };
  }
}

function checkDepartureTime(departuretime){
  if (generateDate(departuretime.trim()) <= generateDate(formalDepartureTime)) {
    return {
      departure_status: "excuse",
      early_departure_period: getDifferenceInHours(departuretime, formalDepartureTime) * 60,
    };
  } else {
    return {
      departure_status: "normal-departure",
      early_departure_period: 0,
    };
  }
}

export { confirmAttendance, getEmployeeUsernameToConfirmAttendance };
