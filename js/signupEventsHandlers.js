function isValidUserName(username) {
  return /^[a-zA-Z]{3,8}$/.test(username.trim());
}

function isValidEmail(email) {
  return  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function isValidAge(age){
  return /^(23|[3-6][0-9]|5[0-5])$/.test(Number(age))
}

function isValidAddress(address){
 return /^[a-zA-Z0-9\s,'-]*$/.test(address)
}

export function validateFirstNameOnBlur() {
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

export function validateFirstNameOnKeyDown() {
  // if(isValidUserName(this.value)){
  //   $(this).css("border-bottom", "2px solid green");
  // }
  this.focus();
  $(".firstname-error").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");

}

export function validatelastNameOnBlur() {
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
    $("input[name=email]").focus();
  }
}

export function validatelastNameOnKeyDown() {
  // if(isValidUserName(this.value)){
  //   $(this).css("border-bottom", "2px solid green");
  // }
  this.focus();
  $(".lastname-error").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");

}

export function validateEmailOnBlur() {
  if (!isValidEmail(this.value)) {
    this.focus();
    this.select();
    $(".email-error").removeClass("d-none");
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

export function validateEmailOnKeyDown() {
  // if(isValidUserName(this.value)){
  //   $(this).css("border-bottom", "2px solid green");
  // }
  this.focus();
  $(".email-error").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");
}

export function validateAddressOnBlur() {
  if (!isValidAddress(this.value)) {
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
  }
}

export function validateAddressOnKeyDown() {
  this.focus();
  $(".address-error").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");
}

export function validateAgeOnBlur() {
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

export function validateAgeOnKeyDown() {
  this.focus();
  $(".age-error").addClass("d-none");
  $(this).css("border-bottom", "2px solid #dfe7f1");
}