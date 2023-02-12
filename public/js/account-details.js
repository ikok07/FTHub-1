'use strict';

const sportButton = document.querySelectorAll(
  '.after-account-sport-types-button'
);
const err = document.querySelector('.after-error');

const sex = document.querySelector('.input-gender');
const birth = document.querySelector('.input-birth');
const height = document.querySelector('.input-height');
const kg = document.querySelector('.input-weight');

const btnSubmit = document.querySelector('.after-cont');

let sportsArr = [];
sportButton.forEach(sportBtn => {
  sportBtn.addEventListener('click', () => {
    const btnText = sportBtn.textContent.trim();
    if (sportsArr.includes(btnText)) {
      const existingIndex = sportsArr.indexOf(btnText);
      sportsArr.splice(existingIndex, 1);
      sportBtn.value = '0';
      sportBtn.style.removeProperty('background-color');
      sportBtn.style.removeProperty('color');
    } else {
      sportsArr.push(btnText);
      sportBtn.value = '1';
      sportBtn.style.backgroundColor = '#01df9a';
      sportBtn.style.color = '#000';
    }

    document.querySelector('.hiddenSports').value = sportsArr;
  });
});

btnSubmit.addEventListener('click', function (e) {
  // prettier-ignore
  if (sex.value === '0' || +height.value === 0 || +birth.value === 0 || kg.value === 0 || sportsArr.length === 0) {
    e.preventDefault();
    err.classList.remove('hidden');
  } else err.classList.add('hidden');
});
