import {
  getAdminData,
  getAllEmployees,
  getRegisterationNotifications,
  confirmEmployee,
  deleteEmployee,
  deleteNotification,
} from "../requests/admin.js";

window.addEventListener("load", function () {
  const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

  allSideMenu.forEach((item) => {
    const li = item.parentElement;

    item.addEventListener("click", function () {
      allSideMenu.forEach((i) => {
        i.parentElement.classList.remove("active");
      });
      li.classList.add("active");
    });
  });

  // TOGGLE SIDEBAR
  const menuBar = document.querySelector("#menu-bar");
  const sidebar = document.getElementById("sidebar");

  menuBar.addEventListener("click", function () {
    sidebar.classList.toggle("hide");
  });

  const searchButton = document.querySelector(
    "#content nav form .form-input button"
  );
  const searchButtonIcon = document.querySelector("#search-icon");
  const searchForm = document.querySelector("#content nav form");

  searchButton.addEventListener("click", function (e) {
    if (window.innerWidth < 576) {
      e.preventDefault();
      searchForm.classList.toggle("show");
      if (searchForm.classList.contains("show")) {
        searchButtonIcon.classList.replace("bx-search", "bx-x");
      } else {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
      }
    }
  });

  // if (window.innerWidth < 768) {
  //   sidebar.classList.add("hide");
  // } else if (window.innerWidth > 576) {
  //   searchButtonIcon.classList.replace("bx-x", "bx-search");
  //   searchForm.classList.remove("show");
  // }

  // window.addEventListener("resize", function () {
  //   if (this.innerWidth > 576) {
  //     searchButtonIcon.classList.replace("bx-x", "bx-search");
  //     searchForm.classList.remove("show");
  //   }
  // });

  adminData();
  displayAllEmployees();
  displayNotifications();
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
  });
}

function adminConfirm() {
  let username = $(this).parent().find("span:eq(0)").html();
  let notificationId = $(this).parent().find("input").val();

  if ($(this).html() == "Confirm") {
    console.log("confirmed");
    confirmEmployee(username)
  } else {
    deleteEmployee(username);
    console.log("cancelled");
  }
  deleteNotification(notificationId);
}


