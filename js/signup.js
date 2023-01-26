import {
  validateFirstNameOnBlur,
  validateFirstNameOnKeyDown,
  validatelastNameOnBlur,
  validatelastNameOnKeyDown,
  validateEmailOnBlur,
  validateEmailOnKeyDown,
  validateAgeOnBlur,
  validateAgeOnKeyDown,
  validateAddressOnBlur,
  validateAddressOnKeyDown,
  validateDepartmentOnChange,
  isValidUserName,
  isValidEmail,
  isValidAge,
  isValidAddress,
} from "./signupEventsHandlers.js";

import { generateRandomCode, id } from "./employee.js";
import {
  addEmployee,
  notifyNewEmployeeRegisteration,
} from "./employeeRequests.js";

window.addEventListener("load", selectDomElements);

function selectDomElements() {
  const firstnameInput = document.querySelector("input[name=firstname]");
  const lastnameInput = document.querySelector("input[name=lastname]");
  const emailInput = document.querySelector("input[name=email]");
  const addressInput = document.querySelector("input[name=address]");
  const ageInput = document.querySelector("input[name=age]");
  const depatrment = document.querySelector("select[name=department]");
  const signupButton = document.querySelector("button");

  firstnameInput.focus();
  firstnameInput.addEventListener("blur", validateFirstNameOnBlur);
  firstnameInput.addEventListener("keydown", validateFirstNameOnKeyDown);

  lastnameInput.addEventListener("blur", validatelastNameOnBlur);
  lastnameInput.addEventListener("keydown", validatelastNameOnKeyDown);

  emailInput.addEventListener("blur", validateEmailOnBlur);
  emailInput.addEventListener("keydown", validateEmailOnKeyDown);

  addressInput.addEventListener("blur", validateAddressOnBlur);
  addressInput.addEventListener("keydown", validateAddressOnKeyDown);

  ageInput.addEventListener("blur", validateAgeOnBlur);
  ageInput.addEventListener("keydown", validateAgeOnKeyDown);

  depatrment.addEventListener("change", validateDepartmentOnChange);
  signupButton.addEventListener("click", validateForm);

  function validateForm(e) {
    if (!isValidUserName(firstnameInput.value)) {
      e.preventDefault();
      firstnameInput.select();
    } else if (!isValidUserName(lastnameInput.value)) {
      e.preventDefault();
      lastnameInput.select();
    } else if (!isValidEmail(emailInput.value)) {
      e.preventDefault();
      emailInput.select();
    } else if (!isValidAddress(addressInput.value)) {
      e.preventDefault();
      addressInput.select();
    } else if (!isValidAge(ageInput.value)) {
      e.preventDefault();
      ageInput.select();
    } else if (depatrment.value === "default") {
      e.preventDefault();
      $(".department-error").removeClass("d-none");
      $("select[name=department]").css("border-bottom", "2px solid red");
    } else {
      let username = generateRandomCode(6);
      let password = generateRandomCode(5) + "@43";
      Email.send({
        SecureToken: "1081cb00-0c92-4207-9112-46555f427fdd",
        To: emailInput.value,
        From: "pd.iti43@gmail.com",
        Subject: "Confirm Registeration On the Attendance System",
        Body: `<div class="container text-center bg-gradient"><h1>Hello ${firstnameInput.value},</h1> <p>Hope all things are well... </p> <p> You recently have registered on our attendance system <p> <p>Please use the following data to login</p> <h3><span class="text-info fw-bolder lead">UserName:</span> ${username}</h3> <h3><span class="text-info fw-bolder lead">Password:</span> ${password}</h3><p>Have a Good Day!</p></div>`,
      }).then((message) => {
        location.replace(
          "http://127.0.0.1:5500/attendance_website/confirmSignup.html"
        );
        addEmployee(
          username,
          password,
          firstnameInput.value,
          lastnameInput.value,
          addressInput.value,
          emailInput.value,
          ageInput.value,
          depatrment.value
        );
        notifyNewEmployeeRegisteration(username);
      });
    }
  }
}

