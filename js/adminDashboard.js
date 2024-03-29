import {
  getAdminData,
  getAllEmployees,
  getRegisterationNotifications,
  confirmEmployee,
  deleteEmployee,
  deleteNotification,
} from "../requests/admin.js";

import { getEmployeeData } from "./../requests/employee.js";
import { logout, getTodayDate } from "./../utilities/employee.js";

window.addEventListener("load", function () {
  const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

  allSideMenu.forEach((item) => {
    const li = item.parentElement;

    item.addEventListener("click", function () {
      allSideMenu.forEach((element) => {
        element.parentElement.classList.remove("active");
      });
      li.classList.add("active");
      console.log($(this).find("span").html());
      let listItemSelected = $(this).find("span").html();
      switch (listItemSelected) {
        case "Dashboard":
          $(".current-menu-name").html("Dashboard");
          $("#employees-data").addClass("d-none");
          $(".data-analysis").removeClass("d-none");
          $("#daily-report-container").addClass("d-none");
          $(".daily-calender").addClass("d-none");
          $("#employees-table").addClass("d-none");
          break;

        case "Employees":
          $(".current-menu-name").html("Employees");
          $("#employees-data").removeClass("d-none");
          $(".data-analysis").addClass("d-none");
          $("#daily-report-container").addClass("d-none");
          $(".daily-calender").addClass("d-none");
          $("#employees-table").addClass("d-none");
          break;

        case "Today Report":
          $(".current-menu-name").html("Today Report");
          $("#employees-data").addClass("d-none");
          $(".data-analysis").addClass("d-none");
          $(".daily-calender").addClass("d-none");
          $("#employees-table").addClass("d-none");
          displayTodayReportForAllEmployees();
          break;

        case "Daily Report":
          $(".current-menu-name").html("Daily Report");
          $("#employees-data").addClass("d-none");
          $(".data-analysis").addClass("d-none");
          $("#daily-report-container").addClass("d-none");
          $(".daily-calender").removeClass("d-none");
          $("#employees-table").addClass("d-none");
          chooseSpecificDayToDisplayAttendance();
          break;

        case "Monthly Report":
          $(".current-menu-name").html("Monthly Report");
          $("#employees-data").addClass("d-none");
          $(".data-analysis").addClass("d-none");
          $("#daily-report-container").addClass("d-none");
          $(".daily-calender").addClass("d-none");
          $("#employees-table").addClass("d-none");
          break;

        default:
          $(".current-menu-name").html("Profile");
          $("#employees-data").addClass("d-none");
          $(".data-analysis").addClass("d-none");
          $("#daily-report-container").addClass("d-none");
          $(".daily-calender").addClass("d-none");
          break;
      }
    });
  });

  const menuBar = document.querySelector("#menu-bar");
  const sidebar = document.querySelector("#sidebar");
  const searchButton = document.querySelector("#search-icon");

  const employeeTable = document.querySelector("#employees-table");

  searchButton.addEventListener("click", async () => {
    const employeeName = document.querySelector("#employee-search").value;
    try {
      const employee = await getEmployeeData(employeeName);
      const employeeAttendance = employee[0].attendance;
      console.log(employeeAttendance, employee);
      const lateDays = employeeAttendance.filter(
        (row) => row.status === "late"
      ).length;
      const absentDays = employeeAttendance.filter(
        (row) => row.status === "absent"
      ).length;
      const excuseDays = employeeAttendance.filter(
        (row) => row.departure_status === "execuse"
      ).length;
      const presentDays = employeeAttendance.length - absentDays - excuseDays;

      employeeTable.innerHTML = `
        <tr>
          <td class="fw-bold fs-4">Name:</td>
          <td>${employee[0].firstname} ${employee[0].lastname}</td>
        </tr>
        <tr>
          <td class="fw-bold fs-4">Email:</td>
          <td>${employee[0].email}</td>
        </tr>
        <tr>
          <td class="fw-bold fs-4">Late Days:</td>
          <td>
          <button class="btn btn-danger">${lateDays}</button>
          </td>  
        </tr>
        <tr>
          <td class="fw-bold fs-4">Excused Days:</td>
          <td>
          <button class="btn btn-warning">${excuseDays}</button>
          </td>
        </tr>
        <tr>
          <td class="fw-bold fs-5">Present Days:</td>
          <td>
          <button class="btn btn-success"> ${presentDays}</button>
          </td>
        </tr>
        <tr>
          <td class="fw-bold fs-4">Attendance:</td>
          <td>
            <table>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
              ${employeeAttendance
                .map(
                  (row) => `
                <tr>
                  <td>${row.date}</td>
                  <td>${row.status}</td>
                </tr>
              `
                )
                .join("")}
            </table>
          </td>
        </tr>
      `;
      // $("#employees-table").DataTable();
    } catch (error) {
      employeeTable.innerHTML = `<tr>
          <td>${error.message}</td>
        </tr>`;
      console.log(error);
    }
  });

  window.addEventListener("resize", function () {
    if (this.innerWidth < 1050) {
      sidebar.classList.add("hide");
    } else {
      sidebar.classList.remove("hide");
    }
  });

  menuBar.addEventListener("click", function () {
    sidebar.classList.toggle("hide");
  });

  adminData();
  displayAllEmployees();
  displayNotifications();
  $(".logout").click(logout);
});

function adminData() {
  getAdminData().then((adminData) => {
    console.log(adminData);
    $(".admin-image").prop("src", adminData.avatar);
  });
}

function displayAllEmployees() {
  getAllEmployees().then((employees) => {
    console.log(employees);
    $(".employees-number").html(employees.length);
    let confirmedEmployeesNumber = employees.filter(
      (employee) => employee.isconfirmed == true
    );
    $(".employees-confirmed").html(confirmedEmployeesNumber.length);
    $(".securitymans-number").html(
      employees.length - confirmedEmployeesNumber.length
    );
    // $("#employees-data").removeClass("d-none");
    $(`<thead>
    <tr><th class="col-2 col-sm-2">FullName</th> <th class="col-2 col-sm-2">Email</th> <th class="d-none d-sm-table-cell">Role</th> <th class="d-none d-sm-table-cell">Address</th> <th class="col-2 col-sm-2">Confirmed</th></tr>
   </thead> `).appendTo("#employees-data-table");
    let tbodyElement = $("<tbody>/tbody>");
    for (let i = 0; i < employees.length; i++) {
      $(`
      <tr><td class="col-2 col-sm-2">${employees[i].firstname} ${employees[i].lastname}</td> <td class="col-2 col-sm-2 text-wrap text-break">${employees[i].email}</td> <td class="d-none d-sm-table-cell">${employees[i].role}</td> <td class="d-none d-sm-table-cell">${employees[i].address}</td> <td class="col-2 col-sm-2">${employees[i].isconfirmed}</td> </tr> 
   
   `).appendTo(tbodyElement);
    }
    tbodyElement.appendTo("#employees-data-table");
    $("#employees-data-table").DataTable();
  });
}

async function displayNotifications() {
  let notifications = await getRegisterationNotifications();
  console.log(notifications);
  $(".notifications-number").html(notifications.length);

  $.each(notifications, function (index, value) {
    let confirmButton = $(
      `<button class="btn btn-outline-success btn-sm me-1" type="button">Confirm</button>`
    );
    const cancelButton = $(
      `<button class="btn btn-outline-danger btn-sm">Cancel</button>`
    );
    const liItem = $(
      `<li class="dropdown-item"> <div class="mb-1"><span class="text-primary">${value.username} </span><input type="hidden" value=${value.id}> <span>has registered on the system </span></div>  </li><hr>`
    );
    $(liItem).append(confirmButton, cancelButton);
    $("#notifications-menu").append(liItem);

    $(liItem).on("click", "button", adminConfirm);
    // $(confirmButton).on("click", adminConfirm);
    // $(cancelButton).on("click", adminCancel);
  });
}

function adminConfirm() {
  let username = $(this).parent().find("span:eq(0)").html();
  let notificationId = $(this).parent().find("input").val();

  console.log(notificationId, username);
  if ($(this).html() == "Confirm") {
    console.log("confirmed");
    confirmEmployee(username);
  } else {
    deleteEmployee(username);
    // console.log("cancelled");
  }
  deleteNotification(notificationId);
}

// function adminCancel() {
//   let username = $(this).parent().find("span:eq(0)").html();
//   let notificationId = $(this).parent().find("input").val();
//   console.log(notificationId, username);
//   deleteEmployee(username);
//   console.log("cancelled");
//   deleteNotification(notificationId,);
// }

async function displayTodayReportForAllEmployees() {
  let allEmployees = await getAllEmployees();
  $("#daily-report-container").removeClass("d-none");

  console.log(allEmployees);
  $(`<thead>
<tr><th>FullName</th> <th>Role</th><th>Arrival</th><th>Departure</th><th>Status</th></tr>
</thead> `).appendTo("#daily-report-table");
  let tbodyElement = $("<tbody>/tbody>");

  for (let i = 0; i < allEmployees.length; i++) {
    let today = getTodayDate();
    console.log(
      allEmployees[i].attendance[allEmployees[i].attendance.length - 1]
    );
    let trElement = $("<tr>/tr>");
    $(`
  <td>${allEmployees[i].firstname} ${allEmployees[i].lastname}</td> <td>${allEmployees[i].role}</td>`).appendTo(
      trElement
    );

    allEmployees[i].attendance[allEmployees[i].attendance.length - 1] &&
    allEmployees[i].attendance[allEmployees[i].attendance.length - 1].date ==
      today
      ? $(`   <td>${
          allEmployees[i].attendance[allEmployees[i].attendance.length - 1]
            .arrival_time
        }</td> <td>${
          allEmployees[i].attendance[allEmployees[i].attendance.length - 1]
            .departure_time
        }</td> <td>${
          allEmployees[i].attendance[allEmployees[i].attendance.length - 1]
            .status
        }</td> 

`).appendTo(trElement)
      : $(
          ` <td>00:00:00</td> <td>00:00:00</td> <td>Has not arrived yet</td> `
        ).appendTo(trElement);

    trElement.appendTo(tbodyElement);
  }
  tbodyElement.appendTo("#daily-report-table");
  $("#daily-report-table").DataTable();
}

function chooseSpecificDayToDisplayAttendance() {
  console.log($("input[name=daily-report]").val());
  $("input[name=daily-report]").on("change", displayDataOnChoosedDay);
}

function displayDataOnChoosedDay() {
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
    //  $('#daily-report-container').html("")
    displaySpecificDayAttendanceData(choosedDate);
  }
}

async function displaySpecificDayAttendanceData(chooseddate) {
  let allEmployees = await getAllEmployees();
  $("#daily-report-container").removeClass("d-none");
  $("#daily-report-table").html("");
  console.log(allEmployees);
  $(`<thead>
<tr><th>FullName</th> <th>Role</th> <th>Date</th><th>Arrival</th><th>Departure</th><th>Status</th><th>Delay</th></tr>
</thead> `).appendTo("#daily-report-table");
  let tbodyElement = $("<tbody>/tbody>");

  for (let i = 0; i < allEmployees.length; i++) {
    let chooseddateData = allEmployees[i].attendance.find(
      (elem) => elem.date.trim() == chooseddate
    );
    console.log(chooseddateData);
    let trElement = $("<tr>/tr>");
    $(`
  <td>${allEmployees[i].firstname} ${allEmployees[i].lastname}</td> <td>${allEmployees[i].role}</td><td> ${chooseddate}</td>`).appendTo(
      trElement
    );

    allEmployees[i].attendance.length > 0 && chooseddateData
      ? $(`<td>${chooseddateData.arrival_time}</td> <td>${chooseddateData.departure_time}</td> <td>${chooseddateData.status}</td> 
      <td>${chooseddateData.delay} minute</td> 
`).appendTo(trElement)
      : $(
          ` <td>No Data</td> <td>No Data</td> <td>No Data</td> <td>No Data</td> `
        ).appendTo(trElement);

    trElement.appendTo(tbodyElement);
  }
  tbodyElement.appendTo("#daily-report-table");
  $("#daily-report-table").DataTable();
}
