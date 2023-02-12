'use strict';

const arrowRight = document.querySelector('.fa-angle-right');
const arrowDown = document.querySelector('.fa-angle-down');
const foodExtend = document.querySelector('.food-extend');

const toggleArrow = function (e) {
  e.preventDefault();
  localStorage.setItem(
    'menuStateOpen',
    foodExtend.classList.contains('hidden')
  );

  arrowRight.classList.toggle('hidden');
  arrowDown.classList.toggle('hidden');
  foodExtend.classList.toggle('hidden');
};

const initMenuBar = function () {
  if (!localStorage.getItem('menuStateOpen')) return;
  const menuStateOpen = localStorage.getItem('menuStateOpen') === 'false';

  if (!menuStateOpen) {
    arrowRight.classList.toggle('hidden');
    arrowDown.classList.toggle('hidden');
    foodExtend.classList.toggle('hidden');
  }
};
initMenuBar();

arrowRight.addEventListener('click', toggleArrow);
arrowDown.addEventListener('click', toggleArrow);
