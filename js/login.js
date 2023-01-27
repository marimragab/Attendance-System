import { isExistEmployee } from "./../requests/employee.js";

$(function () {
  const usernameInput = document.querySelector("input[name=username]");
  const passwordInput = document.querySelector("input[name=password]");
  const loginButton = document.querySelector("button");

  usernameInput.focus();
  loginButton.addEventListener("click", async function () {
    if (
      usernameInput.value == "PDITIAdmin" &&
      passwordInput.value == "PDITI@43"
    ) {
      sessionStorage.setItem('admin',usernameInput.value)
      window.location.href =
        "http://127.0.0.1:5500/attendance_website/admin.html";
    } else {
      let employee = await isExistEmployee(
        usernameInput.value,
        passwordInput.value
      );
      if (employee.length > 0 && employee[0].isconfirmed) {
        console.log(employee[0]);
        if (employee[0].role == "employee") {
        $(".wrongdata-error").addClass("d-none");
          window.location.href =
            "http://127.0.0.1:5500/attendance_website/employee.html";
        } else {
        $(".wrongdata-error").addClass("d-none");
          window.location.href =
            "http://127.0.0.1:5500/attendance_website/securityman.html";
        }
        localStorage.setItem('currentUserName',employee[0].username)
      } else {
        $(".wrongdata-error").removeClass("d-none");
      }
    }
  });
});
