const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const titleEl = document.getElementById('title');
// Variables for the Countdown
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
// variable for complete
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// Global Variable
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min Todays Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //   Hide Input
    inputContainer.hidden = true;

    // Complete function
    // If the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `(${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      //   Populate Countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  // countdownTitle = e.srcElement[0].value;
  // countdownDate = e.srcElement[1].value;
  // or
  countdownTitle = titleEl.value;
  countdownDate = dateEl.value;

  console.log(countdownTitle, countdownDate);
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  //   Check for date
  if (countdownDate === '') {
    alert('Please select a date for the countdown');
  } else {
    //   Get Number version of Current Date, updateDom
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Reset all values
function reset() {
  // hide Countdowns, Show Input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the Countdown
  clearInterval(countdownActive);
  //   Reset all values
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

// Restore the local storage
function restorePreviousCountdown() {
  // Get countdown from local storage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}
// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, Check localstorage
restorePreviousCountdown();
