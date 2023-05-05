import Notiflix from 'notiflix';

const variables = {
  form: document.querySelector('.form'),
};

console.log(variables.btnSubmit);

variables.form.addEventListener('submit', submit);

function submit(event) {
  event.preventDefault();

  let foolDelay = event.currentTarget.delay.valueAsNumber;
  const stepDelay = event.currentTarget.step.valueAsNumber;
  const amountOfPromises = event.currentTarget.amount.valueAsNumber;

  for (let position = 1; position <= amountOfPromises; position++) {
    createPromise(position, foolDelay);
    foolDelay += stepDelay;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
