const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
console.log(startBtn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timerId = null;

document.onclick = function (e) {
  if (e.target === startBtn) {
    startBtn.setAttribute('disabled', 'true');
  } else if (e.target === stopBtn) {
    startBtn.removeAttribute('disabled');
  }
};

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();

    console.log('sec');
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
});
