import { isDuplicateEmail } from "./employeeRequests.js";

function isValidUserName(username) {
  return /^[a-zA-Z]{3,8}$/.test(username.trim());
}

function isValidEmail(email) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function isValidAge(age) {
  return /^(23|[3-6][0-9]|5[0-5])$/.test(Number(age));
}

function isValidAddress(address) {
  return /^[a-zA-Z0-9\s,'-]*$/.test(address);
}

function validateFirstNameOnBlur() {
  console.log(this);
  console.log(this.value);
  if (!isValidUserName(this.value)) {
    this.focus();
    this.select();
    $(".firstname-error").removeClass("d-none");
    $(".firstname-done").addClass("d-none");
    $(this).css("border-bottom", "2px solid red");
  } else {
    $(".firstname-error").addClass("d-none");
    $(".firstname-done").removeClass("d-none");
    $(this).css("border-bottom", "2px solid green");
    $(this).css("background", "none");
    $("input[name=lastname]").focus();
  }
}

function validateFirstNameOnKeyDown() {
  this.focus();
  $(".firstname-error").addClass("d-none");
  $(".firstname-done").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");
}

function validatelastNameOnBlur() {
  console.log(this);
  console.log(this.value);
  if (!isValidUserName(this.value)) {
    this.focus();
    this.select();
    $(".lastname-error").removeClass("d-none");
    $(".lastname-done").addClass("d-none");
    $(this).css("border-bottom", "2px solid red");
  } else {
    $(".lastname-error").addClass("d-none");
    $(".lastname-done").removeClass("d-none");
    $(this).css("border-bottom", "2px solid green");
    $(this).css("background", "none");
    $("select[name=department]").css("background","lightgrey");
  }
}

function validatelastNameOnKeyDown() {
  this.focus();
  $(".lastname-error").addClass("d-none");
  $(".lastname-done").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");
}

function validateDepartmentOnChange() {
  if (this.value == "default") {
    $(".department-error").removeClass("d-none");
    $(this).css("border-bottom", "2px solid red");

  } else {
    $(".department-error").addClass("d-none");
    $(this).css("background","none");
    $(this).css("border-bottom", "2px solid green");
    $("input[name=email]").focus();
  }
}

async function validateEmailOnBlur() {
  let isEmailExistBefore = await isDuplicateEmail(this.value);
  console.log(isEmailExistBefore);
  if (isValidEmail(this.value) && isEmailExistBefore) {
    console.log("Email Present Before");
    $(".email-duplicate").removeClass("d-none");
    $(".email-done").addClass("d-none");
    $(".email-error").addClass("d-none");
  } else if (!isValidEmail(this.value)) {
    this.focus();
    this.select();
    $(".email-error").removeClass("d-none");
    $(".email-duplicate").addClass("d-none");
    $(".email-done").addClass("d-none");
    $(this).css("border-bottom", "2px solid red");
  } else {
    $(".email-error").addClass("d-none");
    $(".email-done").removeClass("d-none");
    $(this).css("border-bottom", "2px solid green");
    $(this).css("background", "none");
    $("input[name=address]").focus();
  }
}

function validateEmailOnKeyDown() {
  this.focus();
  $(".email-error").addClass("d-none");
  $(".email-done").addClass("d-none");
  $(".email-duplicate").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");
}

function validateAddressOnBlur() {
  if (!isValidAddress(this.value) || !this.value) {
    this.focus();
    this.select();
    $(".address-error").removeClass("d-none");
    $(".address-done").addClass("d-none");
    $(this).css("border-bottom", "2px solid red");
  } else {
    $(".address-error").addClass("d-none");
    $(".address-done").removeClass("d-none");
    $(this).css("border-bottom", "2px solid green");
    $(this).css("background", "none");
    $("input[name=age]").focus();
  }
}

function validateAddressOnKeyDown() {
  this.focus();
  $(".address-error").addClass("d-none");
  $(".address-done").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");
}

function validateAgeOnBlur() {
  if (!isValidAge(this.value)) {
    this.focus();
    this.select();
    $(".age-error").removeClass("d-none");
    $(".age-done").addClass("d-none");
    $(this).css("border-bottom", "2px solid red");
  } else {
    $(".age-error").addClass("d-none");
    $(".age-done").removeClass("d-none");
    $(this).css("border-bottom", "2px solid green");
    $(this).css("background", "none");
  }
}

function validateAgeOnKeyDown() {
  this.focus();
  $(".age-error").addClass("d-none");
  $(".age-done").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");
}

export {
  isValidUserName,
  isValidEmail,
  isValidAge,
  isValidAddress,
  validateFirstNameOnBlur,
  validatelastNameOnBlur,
  validateEmailOnBlur,
  validateAddressOnBlur,
  validateAgeOnBlur,
  validateFirstNameOnKeyDown,
  validatelastNameOnKeyDown,
  validateEmailOnKeyDown,
  validateAddressOnKeyDown,
  validateAgeOnKeyDown,
  validateDepartmentOnChange,
};
