"use strict";
let fullName = "Ryan Blackwell";
console.log(`Full Name: ${fullName}`)
let desiredSalary = 999999.99;
console.log("Desired Salary: $" + desiredSalary);
let veteranStatus = false;
console.log(`Is a Veteran: ${veteranStatus}`);
let friendNames = ["Anton", "Nick", "Haruki"];
let friendSalaries = [80000.00, 150000.00, "Any"];
console.log(`Friend 1 Name: ${friendNames[0]}\nDesired Salary: $${friendSalaries[0]}`);
console.log(`Friend 2 Name: ${friendNames[1]}\nDesired Salary: $${friendSalaries[1]}`);
console.log(`Friend 3 Name: ${friendNames[2]}\nDesired Salary: ${friendSalaries[2]}`);
let otherFriend = {
    name: "Nicholas",
    lastName:"Scalzo",
    salary: 200000.00
};
console.log(otherFriend);
console.log(otherFriend.name, otherFriend.lastName, otherFriend.salary)