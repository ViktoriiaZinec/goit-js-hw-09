import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const variables = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
console.log(variables.seconds);

variables.button.disabled === true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      variables.button.disabled === true;
      //   window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    if (selectedDates[0] > new Date()) {
      variables.button.removeAttribute('disabled');
    }
    variables.button.addEventListener('click', () => {
      interval = setInterval(() => {
        const diff = selectedDates[0] - new Date();
        if (diff < 1000) {
          clearInterval(interval);
        }
        const result = convertMs(diff);
        countdown(result);
      }, 1000);
    });
  },
};

// Otherwise, selectors are also supported
flatpickr('#datetime-picker', options);

const countdown = ({ days, hours, minutes, seconds }) => {
  variables.days.textContent = `${days}`;
  variables.hours.textContent = `${hours}`;
  variables.minutes.textContent = `${minutes}`;
  variables.seconds.textContent = `${seconds}`;
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
