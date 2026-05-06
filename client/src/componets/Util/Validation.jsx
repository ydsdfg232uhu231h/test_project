

import "./validation.css"

export default function validationpassword({firstname, lastname,gender,phone,role,termsagree, email, password, confirmpassword}) {
  const errorinitialdata = {firstnames: "", lastnames: "", genders: "",emails: "", passwords: "",termsagrees: "", roles: "", phones: "", confirmpasswords: ""};
  
  const emailsneed = /^[A-Za-z0-9]{8,16}@gmail\.com$/;
  const emojiRegex = /[\p{Extended_Pictographic}]/u;
  const phonestring = String(phone || "");
  const phonenumber = (phonestring.match(/[0-9]/g) || []).length;
  const capitalCount = (password.match(/[A-Z]/g) || []).length;
  const numberCount = (password.match(/[0-9]/g) || []).length;
  const specialCount = (password.match(/[^A-Za-z0-9]/g) || []).length;
  if (!email || email === "") {
    
    errorinitialdata.emails = "Email required\n";
  }
 else if (!emailsneed.test(email)) {
    
    errorinitialdata.emails = "Email must be 8-16 characters (letters/numbers only) and end with @gmail.com\n"
  }
  if (!password || password === "") {
   
    errorinitialdata.passwords = "Password required\n"
  }
  else if (password.length < 10 || password.length > 20) {
    
    errorinitialdata.passwords = "Password must be between 10 to 20 Characters ";
  }
  else if (capitalCount < 4 || numberCount < 3 || specialCount < 3) {
    
    errorinitialdata.passwords =`${(capitalCount < 4) ? ("At least 4 capital letters") : ""} ${(numberCount < 3) ? "Atleast 3 numbers" : ""} ${(specialCount < 3) ? "Atleast 3 special characters" : ""} `
  }
  if (emojiRegex.test(password)) {
    
    errorinitialdata.passwords = " Password must not contain emojis\n";
  }
   if (!role || role === "") {
 
    errorinitialdata.roles = "You are required to tell us who are you\n";
  }
   if (!phone|| phone === "") {    
    
    errorinitialdata.phones = "Your phone number is required\n";
  }
  else if (!phonenumber || phonenumber<8||phonenumber<10){
    errorinitialdata.phones = "Incorrect phone number input\n";
  }
   if (!gender || gender === "") {
    errorinitialdata.genders = "You need to tell us you gender\n";
  }
  
   if (!lastname || lastname === "") {
    errorinitialdata.lastnames = "Your surname is required\n";
  }
  else if(lastname.length < 1){
    errorinitialdata.lastnames = 'Your sername is incorrect\n';
  }
   if (!firstname || firstname === "") {
    errorinitialdata.firstnames = "Your first name is required required\n";
  }
  if (!confirmpassword || confirmpassword === "") {
    errorinitialdata.confirmpasswords = "Re-enter the password"
  }
  else if (password !== confirmpassword || !confirmpassword) {
    errorinitialdata.confirmpasswords = " Your confirm password is incorrect\n please provide confirm password";
  }
  if (termsagree === false) {
    errorinitialdata.termsagrees = "You need to accept over terms and condition"
  }
  console.log('error', errorinitialdata);
  
  return errorinitialdata;
}

