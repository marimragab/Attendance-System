import {
  getEmployeeData,
  notifyEmployeeArrival,
  notifyEmployeeDeparture,
  getDailyReport,
  getSpecificEmployeeAttendance,
} from "./../requests/employee.js";
import {
  getCurrentDayAndTime,
  getTodayDate,
  logout,
  formatTime,
} from "./../utilities/employee.js";

window.addEventListener("load", function () {
  // set the value of input date to today date
  // let today = new Date();
  // $('.today-date').val(today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate());
  let currentUser = localStorage.getItem("currentUserName");
  console.log(currentUser);
  displayCurrentEmployeeData(currentUser);

  $("#arrival-btn").on("click", recordArrival);
  $("#departure-btn").on("click", recordDeparture);

  if (localStorage.getItem("arrived")) {
    $("#arrival-btn").addClass("disabled");
    $("#departure-btn").removeClass("disabled");
  }

  if (localStorage.getItem("departed")) {
    $("#departure-btn").addClass("disabled");
  }
  $(".logout-icon").click(logout);

  $("#daily-report").on("click", displayCalender);
  $("#monthly-report").on("click", displayRangeCalendar);
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
      $("#report-data").addClass("d-none");
      // $(".daily-calender").addClass("d-none");
      $(".unvalid-date").removeClass("d-none");
    } else {
      $(".unvalid-date").addClass("d-none");
      console.log(choosedDate);
      $("#report-data").html("");
      displayReportData(choosedDate);
    }
  }
}

// async function displayReportData(choosedDate) {
//   const employeeData = await getEmployeeData(
//     localStorage.getItem("currentUserName")
//   );
//   const choosedDateReport = await getDailyReport(
//     localStorage.getItem("currentUserName"),
//     choosedDate
//   );
//   console.log(choosedDateReport, employeeData[0]);
//   $("#report-data").removeClass("d-none");
//   $(".monthly-calender").addClass("d-none");
//   $("#monthly-report-container").addClass("d-none");
//   $(".unvalid-start-date").addClass("d-none");
//   $(".unvalid-end-date").addClass("d-none");
//   $(
//     `<div><li class="list-group-item list-group-item-action"><span class="fw-bold">Employee Name:</span>  ${employeeData[0].firstname} ${employeeData[0].lastname}</li><li class="list-group-item list-group-item-action"><span class="fw-bold">Date:</span>  ${choosedDateReport.date}</li><li class="list-group-item list-group-item-action"><span class="fw-bold">Arrival Time:</span> ${choosedDateReport.arrival_time}</li><li class="list-group-item list-group-item-action"><span class="fw-bold">Departure Time:</span>  ${choosedDateReport.departure_time}</li> <li class="list-group-item list-group-item-action"><span class="fw-bold">Status:</span>  ${choosedDateReport.status}</li>
//     <li class="list-group-item list-group-item-action"><span class="fw-bold">Delay:</span>  ${choosedDateReport.delay} minute</li></div>`
//   ).appendTo("#report-data");
// }

async function displayReportData(choosedDate) {
  const employeeData = await getEmployeeData(
    localStorage.getItem("currentUserName")
  );

  let choosedDateReport = await getDailyReport(
    localStorage.getItem("currentUserName"),
    choosedDate
  );

  if (choosedDate === getTodayDate()) {
    // If the chosen date is today, set default values
    choosedDateReport = {
      date: new Date().toLocaleDateString(),
      arrival_time: "00:00 AM",
      departure_time: "00:00 PM",
      status: "",
      delay: 0,
    };
  } else if (choosedDateReport === false) {
    // If the chosen date is not in the attendance array, set default values
    choosedDateReport = {
      date: choosedDate,
      arrival_time: "08:30 AM",
      departure_time: "03:30 PM",
      status: "Absent",
      delay: 0,
    };
  }

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

function displayRangeCalendar() {
  $(".daily-calender").addClass("d-none");
  $("#report-data").addClass("d-none");
  $(".monthly-calender").removeClass("d-none");
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "right",
    },
    async function (start, end, label) {
      console.log(
        `A new date selection was made: ${start.format(
          "YYYY-MM-DD"
        )} to ${end.format("YYYY-MM-DD")}`
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
      // if (startIndex != -1 && endIndex != -1) {
      console.log("no data on that day");
      $("#monthly-report-container").removeClass("d-none");
      $(".unvalid-start-date").addClass("d-none");
      $(".unvalid-end-date").addClass("d-none");
      $(`<thead>
         <tr><th>Date</th> <th>Arrival Time</th> <th>Departure Time</th> <th>Status</th> <th>Delay</th></tr>
        </thead> `).appendTo("#monthly-report-data");
      let tbodyElement = $("<tbody>/tbody>");
      for (
        let d = new Date(startDate);
        d <= new Date(endDate);
        d.setDate(d.getDate() + 1)
      ) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;
        let data = employeeAttendance.find((item) => item.date === dateString);
        if (!data) {
          data = {
            date: dateString,
            arrival_time: "00:00:00",
            departure_time: "00:00:00",
            status: "Absent",
            delay: "00:00:00",
          };
        }
        $(`
             <tr><td>${data.date}</td> <td>${data.arrival_time}</td> <td>${data.departure_time}</td> <td>${data.status}</td> <td>${data.delay}</td> </tr>
          `).appendTo(tbodyElement);
      }

      tbodyElement.appendTo("#monthly-report-data");
      $("#monthly-report-data").DataTable();
    }
  );
}
