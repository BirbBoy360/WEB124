/* Ryan Blackwell 10/30/25 */

//Fix Mother's Day
const submit = document.querySelector('.addTimer');
const submitCustom = document.querySelector('.addCustom');
const eventSelect = document.querySelector('#event');
const display = document.querySelector('.display');
const dateInput = document.querySelector('#custom');
const currDate = new Date();
const currYear = currDate.getFullYear();
//Need to access timers' properties later so I need a list of them and to assign IDs
let timers = [];

//This function creates the event's date based on user selection from dropdown
function addEvent(userChoice) {
  //no need for spelling catches, using dropdown selection
  const choice = String(userChoice).toUpperCase();
  if (!choice || choice === "Choose an Event:") return;
  let date;
  let calendarBool = false;
  console.log(choice);
  switch (choice) {
    case "CHRISTMAS":
      date = new Date(currYear, 11, 25, 0, 0, 0);
      break;
    case "HALLOWEEN":
      date = new Date(currYear, 9, 31, 0, 0, 0);
      break;
    case "THANKSGIVING":
      //special its the 4th thursday of november
      date = new Date(currYear, 10, 1, 0, 0, 0);
      calendarBool = true;
      break;
    case "NEW YEAR'S":
      date = new Date(currYear, 11, 31, 23, 59, 59);
      break;
    case "MOTHER'S DAY":
      //second sunday in may
      date = new Date(currYear, 4, 1, 0, 0, 0);
      calendarBool = true;
      break;
    case "4TH OF JULY":
      date = new Date(currYear, 6, 4, 0, 0, 0);
      break;
    case "VALENTINE'S DAY":
      date = new Date(currYear, 1, 14, 0, 0, 0);
      break;
    default:
      console.log("defaulted");
      break;
  }
  date = compareDates(date);
  if (calendarBool) {
    date = calendar(date);
  }
  return date;
}
//This is called by addEvent to check if the event has already passed this year
function compareDates(eventDate) {
  let nextYear = currDate.getFullYear() + 1;
  if (eventDate < currDate) {
    eventDate.setFullYear(nextYear);
    return eventDate;
  }
  else {
    return eventDate;
  }
}
//This function adjusts dates for weird events in addEvent
function calendar(eventDate) {
  if (!eventDate) return eventDate;
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth();

  // Thanksgiving: fourth Thursday in November (month index 10)
  if (month === 10) {
    const firstOfMonth = new Date(year, 10, 1);
    const daysAway = (4 - firstOfMonth.getDay() + 7) % 7; // days to first Thursday
    const firstThursdayDate = 1 + daysAway;
    const fourthThursdayDate = firstThursdayDate + 21; // add 3 weeks
    return new Date(year, 10, fourthThursdayDate, 0, 0, 0);
  }

  // Mother's Day: second Sunday in May (month index 4)
  if (month === 4) {
    const firstOfMay = new Date(year, 4, 1);
    const daysAway = (0 - firstOfMay.getDay() + 7) % 7; // days to first Sunday
    const firstSundayDate = 1 + daysAway;
    const secondSundayDate = firstSundayDate + 7;
    return new Date(year, 4, secondSundayDate, 0, 0, 0);
  }

  return eventDate;
}
//timer constructor mess
function Timer(date, eventName) {
  this.eventDate = date;
  this.countdown = this.eventDate - new Date();
  this.eventName = eventName;

  this.div = document.createElement('div');
  this.div.className = 'timer';
  const rmvBtn = document.createElement('button');
  rmvBtn.textContent = 'X';
  rmvBtn.className = 'removeBtn';
  display.appendChild(this.div);
  this.div.appendChild(rmvBtn);

  this.getTime = () => {
    if (this.countdown <= 0) {
      this.div.textContent = `Event Date: ${this.eventDate.toString()}` +
        `\nTime Remaining: Happy ${this.eventName}!`;
      this.div.appendChild(rmvBtn)
      return;
    }
    //Not my code
    const totalSec = Math.max(0, Math.floor(this.countdown / 1000));
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    //back to my code
    this.div.textContent = `Event Date: ${this.eventDate.toString()}` +
      `\nTime Remaining: ${days}d ${hours}h ${mins}m ${secs}s`;
    this.div.appendChild(rmvBtn);
  };

  this.updateCountdown = () => {
    this.countdown = this.eventDate - new Date();
    this.getTime();
  };

  rmvBtn.addEventListener('click', () => {
    if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
    // not my line below, I needed something to find values in array
    timers = timers.filter(t => t !== this);
  });

  this.getTime();
}

let _updateIntervalId = null;

submit.addEventListener('click', () => {
  let eventDate = addEvent(eventSelect.value);
  if (eventDate) {
    console.log(eventDate, "was selected.");
    const newTimer = new Timer(eventDate, eventSelect.value);
    timers.push(newTimer);

    //should be single interval that updates all event timers once per second?
    if (!_updateIntervalId) {
      _updateIntervalId = setInterval(() => {
        // update timers
        timers.forEach(timer => timer.updateCountdown());
      }, 1000);
    }
  }
});
submitCustom.addEventListener('click', () => {
  let eventDate = new Date(dateInput.value + 'T00:00:00.000Z');
  if (eventDate < Date.parse(currDate)) { alert("Please enter a date in the future."); return; }
  if (eventDate) {
    console.log(eventDate, "was selected.");
    const newTimer = new Timer(eventDate, "Event");
    timers.push(newTimer);

    //should be single interval that updates all custom timers once per second?
    if (!_updateIntervalId) {
      _updateIntervalId = setInterval(() => {
        // update timers
        timers.forEach(timer => timer.updateCountdown());
      }, 1000);
    }
  }
});
