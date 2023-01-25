import { validateFirstNameOnBlur,validateFirstNameOnKeyDown,validatelastNameOnBlur,validatelastNameOnKeyDown,validateEmailOnBlur,validateEmailOnKeyDown,validateAgeOnBlur,validateAgeOnKeyDown,validateAddressOnBlur,validateAddressOnKeyDown} from "./signupEventsHandlers.js";
window.addEventListener("load", selectDoMElements);

function selectDoMElements() {
  let firstnameInput = document.querySelector("input[name=firstname]");
  let lastnameInput = document.querySelector("input[name=lastname]");
  let emailInput = document.querySelector("input[name=email]");
  let addressInput = document.querySelector("input[name=address]");
  let ageInput = document.querySelector("input[name=age]");

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

}
