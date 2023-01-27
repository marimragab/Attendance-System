import { getEmployeeData } from "../requests/employee.js";

$(function () {
    let currentuser = localStorage.getItem("currentUserName");
    console.log(currentuser);
  
  getEmployeeData(currentuser).then(securitymanData=>{
    console.log(securitymanData)
    $('.employee-image').prop('src',securitymanData[0].avatar);
    document.querySelector('.securityman-name').innerText=`${securitymanData[0].firstname} ${securitymanData[0].lastname}`
    document.querySelector('.securityman-email').innerText=`${securitymanData[0].email}`

  });
});

async function getCurrentUserData() {
  let currentuser = localStorage.getItem("currentUserName");
  console.log(currentuser);

  let securitymanData = await getEmployeeData(currentuser);
  console.log(securitymanData[0]);
  return securitymanData[0];
}
