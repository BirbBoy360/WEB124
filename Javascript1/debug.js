const debug = document.querySelector('.debug');
var theTime, seconds;
var turnAmount;
//New plan, execute timing code solely off of setInterval with the initial positions being determined by new Date();
function getTime() {
  theTime = new Date();
  seconds = theTime.getSeconds();
  const debugSeconds = seconds % 4;
  initializeGear(debugSeconds);
}
function initializeGear(sec) {
  switch (sec) {
    case 0:
      debug.style.transform = `rotate(90deg)`;
      debug.textContent = String(debug.style.transform).substring(7, String(debug.style.transform).length - 4);
      break;
    case 1:
      debug.style.transform = `rotate(0deg)`;
      debug.textContent = String(debug.style.transform).substring(7, String(debug.style.transform).length - 4);
      break;
    case 2:
      debug.style.transform = `rotate(270deg)`;
      debug.textContent = String(debug.style.transform).substring(7, String(debug.style.transform).length - 4);
      break;
    case 3:
      debug.style.transform = `rotate(180deg)`;
      debug.textContent = String(debug.style.transform).substring(7, String(debug.style.transform).length - 4);
      break;
    default:
      console.log(`Time Error: debugSeconds = ${sec} % 4 =`, sec);
  }
}
if (typeof debug === 'undefined' || typeof debug.style.transition === 'undefined' || typeof debug.textContent === 'undefined' || typeof debug.style.transform === 'undefined') {
  console.log("Idiot cant define vars")
} 

  function debugRotate() {
    let trString = String(debug.style.transform);
    turnAmount = Number(trString.substring(7, trString.length-4));
    turnAmount -= 90;
    debug.textContent = turnAmount;
    debug.style.transform = `rotate(${turnAmount}deg)`;
    console.log(trString, turnAmount);
  }

getTime();

setInterval( () => {console.log(turnAmount)}, 500)
setInterval(debugRotate, 1000);