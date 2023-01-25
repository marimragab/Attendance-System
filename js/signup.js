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
} from "./signupEventsHandlers.js";
window.addEventListener("load", selectDomElements);

function selectDomElements() {
  const firstnameInput = document.querySelector("input[name=firstname]");
  const lastnameInput = document.querySelector("input[name=lastname]");
  const emailInput = document.querySelector("input[name=email]");
  const addressInput = document.querySelector("input[name=address]");
  const ageInput = document.querySelector("input[name=age]");
  const signupButton= document.querySelector("button");

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

  signupButton.addEventListener('click',validateForm)
}

function validateForm(){
    location.replace("http://127.0.0.1:5500/attendance_website/confirmSignup.html")
}