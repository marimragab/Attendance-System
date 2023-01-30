import {
  getEmployeeData,
  notifyEmployeeArrival,
  notifyEmployeeDeparture,
  getDailyReport,
  getSpecificEmployeeAttendance,
} from "./../requests/employee.js";
import { getCurrentDayAndTime, getTodayDate } from "./../utilities/employee.js";

window.addEventListener("load", function () {
  // set the value of input date to today date
  // let today = new Date();
  // $('.today-date').val(today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate());
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
  $(".logout-icon").click(logout);

  $("#daily-report").on("click", displayCalender);
  $("#monthly-report").on("click", displayRangeCalender);
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
  localStorage.removeItem("departed");
  let arrivalData = getCurrentDayAndTime();
  arrivalData.username = localStorage.getItem("currentUserName");
  notifyEmployeeArrival(arrivalData);
  console.log(arrivalData);
}

function recordDeparture() {
  $("#arrival-btn").removeClass("disabled");
  $("#departure-btn").addClass("disabled");
  localStorage.removeItem("arrived");
  localStorage.setItem("departed", true);
  let departureData = getCurrentDayAndTime();
  departureData.username = localStorage.getItem("currentUserName");
  notifyEmployeeDeparture(departureData);
}

function displayCalender() {
  $(".monthly-calender").addClass("d-none");
  $("#monthly-report-container").addClass("d-none");
  $(".daily-calender").removeClass("d-none");
  console.log($("input[name=daily-report]").val());
  $("input[name=daily-report]").on("change", chooseDateToDisplayItsReport);
}

function chooseDateToDisplayItsReport() {
  if (this.value == "") {
    $(".date-error").removeClass("d-none");
  } else {
    $(".date-error").addClass("d-none");
    let choosedDate = $("input[name=daily-report]").val();
    let todayDate = getTodayDate();
    console.log(todayDate, "today is");
    if (choosedDate > todayDate) {
      $(".unvalid-date").removeClass("d-none");
    } else {
      $(".unvalid-date").addClass("d-none");
      console.log(choosedDate);
      $("#report-data").html("");
      displayReportData(choosedDate);
    }
  }
}

async function displayReportData(choosedDate) {
  const employeeData = await getEmployeeData(
    localStorage.getItem("currentUserName")
  );
  const choosedDateReport = await getDailyReport(
    localStorage.getItem("currentUserName"),
    choosedDate
  );
  console.log(choosedDateReport, employeeData[0]);
  $("#report-data").removeClass("d-none");
  $(".monthly-calender").addClass("d-none");
  $("#monthly-report-container").addClass("d-none");
  $(".unvalid-start-date").addClass("d-none");
  $(".unvalid-end-date").addClass("d-none");
  $(
    `<div><li class="list-group-item list-group-item-action"><span class="fw-bold">Employee Name:</span>  ${employeeData[0].firstname} ${employeeData[0].lastname}</li><li class="list-group-item list-group-item-action"><span class="fw-bold">Date:</span>  ${choosedDateReport.date}</li><li class="list-group-item list-group-item-action"><span class="fw-bold">Arrival Time:</span> ${choosedDateReport.arrival_time}</li><li class="list-group-item list-group-item-action"><span class="fw-bold">Departure Time:</span>  ${choosedDateReport.departure_time}</li> <li class="list-group-item list-group-item-action"><span class="fw-bold">Status:</span>  ${choosedDateReport.status}</li>
    <li class="list-group-item list-group-item-action"><span class="fw-bold">Delay:</span>  ${choosedDateReport.delay} minute</li></div>`
  ).appendTo("#report-data");
}

function displayRangeCalender() {
  $(".daily-calender").addClass("d-none");
  $("#report-data").addClass("d-none");
  $(".monthly-calender").removeClass("d-none");
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "right",
    },
    async function (start, end, label) {
      console.log(
        `A new date selection was made: ${start.format("YYYY-MM-DD")} to ${end.format("YYYY-MM-DD")}`
      );
      $("#monthly-report-data").html("");
      const startDate = start.format("YYYY-MM-DD");
      const endDate = end.format("YYYY-MM-DD");

      let employeeAttendance = await getSpecificEmployeeAttendance(
        localStorage.getItem("currentUserName")
      );
      console.log(employeeAttendance, startDate, endDate);
      let startIndex = employeeAttendance.findIndex(
        (item) => item.date.trim() === startDate.trim()
      );
      let endIndex = employeeAttendance.findIndex(
        (item) => item.date.trim() === endDate.trim()
      );
      console.log(startIndex, endIndex);
      if (startIndex != -1 && endIndex != -1) {
        console.log("no data on that day");
        $("#monthly-report-container").removeClass("d-none");
        $(".unvalid-start-date").addClass("d-none");
        $(".unvalid-end-date").addClass("d-none");
        $(`<thead>
         <tr><th>Date</th> <th>Arrival Time</th> <th>Departure Time</th> <th>Status</th> <th>Delay</th></tr>
        </thead> `).appendTo("#monthly-report-data");
        let tbodyElement = $("<tbody>/tbody>");
        for (let i = startIndex; i <= endIndex; i++) {
          $(`
           <tr><td>${employeeAttendance[i].date}</td> <td>${employeeAttendance[i].arrival_time}</td> <td>${employeeAttendance[i].departure_time}</td> <td>${employeeAttendance[i].status}</td> <td>${employeeAttendance[i].delay}</td> </tr> 
        
        `).appendTo(tbodyElement);
        }
        tbodyElement.appendTo("#monthly-report-data");
        $("#monthly-report-data").DataTable();
      } else if (startIndex == -1 && endIndex == -1) {
        $("#monthly-report-container").addClass("d-none");
        $(".unvalid-end-date").removeClass("d-none");
        $(".unvalid-start-date").removeClass("d-none");
      } else if (startIndex == -1) {
        $("#monthly-report-container").addClass("d-none");
        $(".unvalid-start-date").removeClass("d-none");
        $(".unvalid-end-date").addClass("d-none");
      } else {
        $(".unvalid-end-date").removeClass("d-none");
        $("#monthly-report-container").addClass("d-none");
        $(".unvalid-start-date").addClass("d-none");
      }
    }
  );
}

function logout() {
  window.location.href = "http://127.0.0.1:5500/attendance_website/login.html";
  localStorage.removeItem("currentUserName");
}
