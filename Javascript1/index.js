const smallCog = document.querySelector('.smallCog');
const largeCog = document.querySelector('.largeCog');
//const cuckoo = new Audio('/clockCuckoo.mp3');
//const tick = new Audio('/clockTick.mp3');
//const tock = new Audio('/clockTock.mp3');

/* 
 css rotations freak out when going from something like 359 to 0 instead going counter clockwise 359 degrees instead of clockwise 1
 increasing degrees above 360 doesn't work either as it causes the same issue
 the only solution I could come up with was to remove the transition altogether or just when moving to 0deg
 this looked too janky 
*/

//changed setDate to getTime to just update theTime and then edit styles through calling other functions  
function getTime() {
  const theTime = new Date();
  const seconds = theTime.getSeconds();
  const mins = theTime.getMinutes();
  turnGears(seconds);
  //playSound(seconds, mins);
}

//New Audio Function
function playSound(seconds, mins) {
  if (seconds == 0 && mins == 0) { cuckoo.play() }//hours
  else if (seconds % 2 == 0) { tock.play() }//even
  else { tick.play() }//odd
}

function interceptRotation(seconds) {
  /* Wait until rotation is almost done, then intercept call with seconds at 0 to rotate manually
    * additional console logs for debugging to ensure code execution in correct order
    * not sure if the Timeouts should be nested in eachother or if the time to wait should just be added, 
    * I don't have the knowledge to test what runs best.
    * I also have no clue how to make sure if somehting is finished before executing more code, 
    * setTimeout was just what I found in quick research that I understood */
  if (true) { //placeholder condition for future use
    //Perform semi-normal rotation to 360deg / 0deg
    //Remove transition to prevent janky backwards rotation
    smallCog.classList.toggle('instantTransmission');
    setTimeout(() => {
      //Set rotation to 360 instantly needs testing
      smallCog.style.transform = `rotate(359deg)`;
    }, 150);
  }
}
/*
 @precondition seconds and minutes must have range of (0, 60]
 Function rotates gears based on the given seconds and minutes
*/
function turnGears(seconds) {
  /* Unlike the clock hands, the gears need to be constantly moving so only seconds are used.
   To figure out the # of teeth I created the first small gear from nothing, 
   determined its rpm, and then used gear ratios to determine what the next ones would be.
   I wanted the first two gears to function with 1 teeth/sec (60 teeth/min) but have a different rpm which was easy
   The next two are disconnected with the driver doing one rotation per minute in increments of 180deg and the other rotating once per hour
   
   I knew nothing about gears before this I just came up with the idea of gears instead of a clock and stuck with it.
   Since I couldn't figure out more complex methods like ratchets, all connected gears must rotate with same teeth/sec

   RPM = (teeth/sec * 60) / teethCount
   Gear Ratio = gear2TeethCount / gear1TeethCount
   Gear2RPM = Gear1RPM / GearRatio
   I played around with adding more but I don't have adobe illustrator or something equivalent so I decided not to
  */
  //4 teeth, 15rpm, 1 teeth/sec
  //needs to turn counter-clockwise
  const smallCogSeconds = seconds % 4;
  //here I'm converting 60 seconds into 1 - 4
  //not strictly necessary but keeps smallCogDegrees from making the rotation well into the thousands of degrees
  switch (smallCogSeconds) {
    case 0:
      smallCog.style.transform = `rotate(90deg)`;
      break;
    case 1:
      smallCog.style.transform = `rotate(1deg)`;
      setTimeout(interceptRotation, 100);
      setTimeout(() => { smallCog.classList.toggle('instantTransmission') }, 700);;
      break;
    case 2:
      smallCog.style.transform = `rotate(270deg)`;
      break;
    case 3:
      smallCog.style.transform = `rotate(180deg)`;
      break;
    default:
      console.log("error in smallCogSeconds:", smallCogSeconds);
  }
  //60 teeth, 1 rpm, 1 teeth/sec
  const largeCogDegrees = ((seconds / 60) * 360);
  if (largeCogDegrees % 360 === 0) { interceptRotation(seconds); }
  else { largeCog.style.transform = `rotate(${largeCogDegrees}deg)`; }
}

setInterval(getTime, 1000);
getTime();

// Below here is what I used for debugging

/* 
* My biggest issue was the timining of the transition removal and re-adding it, for some reason even though the change was logged it didn't seem to be occuring
* Here's an example log: 
    4 x "180  gear smallCog"
    4 x "90  gear smallCog"
        "1  gear smallCog"
        "1  gear smallCog instantTransmission"
        "359  gear smallCog instantTransmission"
        "359  gear smallCog"
    4 x "270  gear smallCog"
    4 x "180  gear smallCog"
* It shouldn't be stuttering between 1 and 359 but it was.
*/
function log() {
  let transformString = String(smallCog.style.transform);
  console.log(transformString.substring(7, transformString.length - 4), smallCog.style.transition, smallCog.classList.value);

}
setInterval(log, 250);