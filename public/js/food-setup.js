'use strict';

const dietItems = [...document.querySelectorAll('.diet-item')];
const allergyItems = [...document.querySelectorAll('.allergy-item')];
const expandBtn = document.querySelector('.food-show-all');
const moreAllergy = document.querySelector('.allergy-all');
const foodPersonal = document.querySelector('.food-personal');
const foodSummary = document.querySelector('.food-summary');
const procceedBut = document.querySelector('.setup-continiue');
const firstItems = [
  ...document.querySelectorAll(
    '.setup-div > div:not(.setup-phase, .nutrition-div), .setup-continiue'
  ),
];
const steps = [...document.querySelectorAll('.step-show')];
const stepShowLabel = [...document.querySelectorAll('.step-show-label')];
const dietNameHidden = document.querySelector('.diet-name-hidden');
const allergies = document.querySelector('.selected-allergies-hidden');

foodSummary.classList.remove('phase-active-span');
foodPersonal.classList.add('phase-active-span');

// Diet choose
dietItems.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const currentBut = e.target.closest('.diet-item');
    currentBut.classList.add('diet-selected');

    if (btn.classList.contains('diet-selected'))
      currentBut.setAttribute('data-select', '1');

    dietItems.forEach(otherBut => {
      if (otherBut !== currentBut) {
        otherBut.classList.remove('diet-selected');
        otherBut.setAttribute('data-select', '0');
      }
    });
  });
});

// Allergy choose
allergyItems.forEach(allergyItem => {
  allergyItem.addEventListener('click', function () {
    allergyItem.classList.toggle('allergy-selected');
    if (allergyItem.classList.contains('allergy-selected'))
      allergyItem.setAttribute('data-select', '1');
    else allergyItem.setAttribute('data-select', '0');
  });
});

// Setup procceed to second step
procceedBut.addEventListener('click', function () {
  const dietName = dietItems
    .filter(btn => btn.classList.contains('diet-selected'))[0]
    .querySelector('.diet-name').textContent;
  dietNameHidden.value = dietName;

  const allergiesSelected = allergyItems
    .filter(btn => btn.classList.contains('allergy-selected'))
    .map(selectedAllergie => selectedAllergie.textContent);
  allergies.value = allergiesSelected;

  document.querySelector('.nutrition-div').style.display = 'grid';

  firstItems.forEach(el => (el.style.display = 'none'));
  steps.forEach(step => {
    if (step.classList.contains('step-hide'))
      step.classList.remove('step-hide');
    else step.classList.add('step-hide');
  });

  stepShowLabel.forEach(label => {
    if (label.classList.contains('phase-active-span')) {
      label.classList.remove('phase-active-span');
    } else label.classList.add('phase-active-span');
  });
});
