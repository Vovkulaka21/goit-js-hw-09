import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

//====================================== оголошення  ========================================

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

refs.btn.setAttribute('disabled', true);
refs.btn.addEventListener('click', startTesting);

let selectDate = null;
let deltaTime = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate >= selectedDates[0]) {
      refs.btn.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date and time in the future');
      return;
    }
    selectDate = Date.parse(selectedDates[0]);
    refs.btn.removeAttribute('disabled');
    Notiflix.Notify.success('You are choose a date');
  },
};

flatpickr('#datetime-picker', options);

// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Please choose a date in the future');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');

// -------------------------------------------------------розрахунок часу---------------------------------------------------------------------------------
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// ============================================================= присвоювання параметру ======================================================================

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function startTesting() {
  let today;
  timerId = setInterval(() => {
    today = selectDate - new Date();
    if (today <= 1000) {
      Notiflix.Notify.info('Cogito ergo sum');
      clearInterval(timerId);
    }
    const { days, hours, minutes, seconds } = convertMs(today);
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.min.textContent = addLeadingZero(minutes);
    refs.sec.textContent = addLeadingZero(seconds);
    console.log(today);
  }, 1000);
}
// console.log()
