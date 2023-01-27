const url = "http://localhost:3000";

async function getAttendanceNotifications() {
  let response = await fetch(`${url}/attendance-notifications`);
  let allNotifications = await response.json();
  return allNotifications;
}

function updateEmployeeAttendance(employeeId,attendanceArray,attendanceData) {
  fetch(`${url}/employees/${employeeId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({attendance:[...attendanceArray,attendanceData]}),
  });
}


export { getAttendanceNotifications,updateEmployeeAttendance };
