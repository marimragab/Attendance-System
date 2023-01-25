const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomCode(length) {
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    randomCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomCode;
}

class Employee{
    constructor(username,password,firstname,lastname,email,address,age,role,isConfirmed=false,attendance=[]){
      this.username=username,
      this.password=password,

    }
}