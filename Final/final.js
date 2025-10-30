//Ryan Blackwell 10/30/25
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const addition = document.getElementById('addition');
const subtraction = document.getElementById('subtraction');
const calculateBtn = document.getElementById('calcBtn');
const inputField = document.getElementById('num');

function addUp(n) {
  let userIn = parseInt(n);
  let stringN = '';
  for (let i = 1; i <= 10; i++) {
    stringN += `${i} + ${n} = ${userIn + i}\n`;
  }
  return stringN;
}
function subtract(n) {
  let userIn = parseInt(n);
  let stringN = '';
  let i = 1;
  while (i <= 10) {
    stringN += `${i} - ${n} = ${i - userIn}\n`;
    i++;
  }
  return stringN;
}
function multiply(n) {
  let userIn = parseInt(n);
  let stringN = '';
  let i = 1;
  do {
    stringN += `${i} * ${n} = ${userIn * i}\n`;
    i++;
  } while (i <= 10);
  return stringN;
}
function divide(n) {
  let userIn = parseInt(n);
  let stringN = '';
  for (let i = 1; i <= 10; i++) {
    stringN += `${i} / ${n} = ${(i / userIn).toFixed(2)}\n`;
  }
  return stringN;
}
calculateBtn.addEventListener('click', () => { 
  const userInput = inputField.value;
  addition.textContent = addUp(userInput);
  subtraction.textContent = subtract(userInput);
  multiplication.textContent = multiply(userInput);
  division.textContent = divide(userInput);
});
