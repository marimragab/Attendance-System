export async function getAllEmployees() {
  let response = await fetch("http://localhost:3000/employees");
  let allEmployees = await response.json();
  return allEmployees;
}
