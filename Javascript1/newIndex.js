// Ryan Blackwell 10/26/25
const smallCog = document.querySelector('.smallCog');
const largeCog = document.querySelector('.largeCog');
var smallDeg, largeDeg;

/* 
  After trying for a while to execute code based off of calling getTime() via setInterval, 
  I simplified it to initializing positions with getTime() and then turnCogs() via setInterval 
  In two other .js files, debug.js and index.js, I attempted to keep the degrees of rotation under 360
  They don't function nor are polished but I left them as documentation of sorts
  This caused issues when switching from 0 to 270 or 354 to 0 
    as the css rotate function used in the transform property went the long way and caused visual issues
  By incrementing the degrees of rotation above 360 there isn't any stuttering. 
  Probably not ideal in a large application though.
  The pngs were made by myself in photoshop, I don't have illustrator. 
*/

function getTime() {
  const theTime = new Date();
  return theTime.getSeconds();
}

function initializeCogs(seconds) {
  //Formula: (( seconds / # of teeth ) * 360deg) + desired angle at 0 sec
  //More can be found in the turnCogs() function of index.js
  if (typeof seconds === 'undefined') {
    console.log("Major Error: Seconds could not be obtained");
    return;
  }

  //Since this only initializes based off of get time and the rest is off of setInterval, 
  //  the seconds don't need to go above 60 to track

  //technically ((seconds * 90) + 90)
  smallCog.style.transform = `rotate(${((seconds / 4) * 360) + 90}deg)`
  //technically (seconds * 6)
  largeCog.style.transform = `rotate(${(seconds / 60) * 360}deg)`;
}

//Rotate off of the cogs' current transform property
function rotateCogs() {
  //Convert to string, extract degrees, convert to number, 
  //Increment by one second worth of degrees, apply back to property
  let smallString = String(smallCog.style.transform);
  let largeString = String(largeCog.style.transform);

  smallDeg = Number(smallString.substring(7, smallString.length - 4));
  smallDeg -= 90;
  smallCog.style.transform = `rotate(${smallDeg}deg)`;

  largeDeg = Number(largeString.substring(7, largeString.length - 4));
  largeDeg += 6;
  largeCog.style.transform = `rotate(${largeDeg}deg)`;

  console.log("-----------------------------");
  console.log("Small:", smallString, smallDeg);
  console.log("Large:", largeString, largeDeg);
}

const seconds = getTime();

//I did the code like this so it runs with less dependencies
initializeCogs(seconds);

setInterval(rotateCogs, 1000);
