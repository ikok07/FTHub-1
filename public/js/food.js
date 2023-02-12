'use strict';

const date = document.querySelector('.food-date');
const week = document.querySelector('.food-week');
const noFoodContent = document.querySelector('.food-no-contents-div');
const foodInfo = document.querySelector('.food-info-div');
const searchBar = document.querySelector('.search-bar');
const btnSearch = document.querySelector('.uil-search');
const foodResult = document.querySelector('.search-info-div');
const noResults = document.querySelector('.no-results');
const spinner = document.querySelector('.spinner');
const navMenu = document.querySelector('.dashboard-bottom');
const btnDropDetails = [
  ...document.querySelectorAll('.food-history-dropdown-button'),
];
const foodNames = [...document.querySelectorAll('.food-history-name')];
const foodDayCalories = document.querySelector('.food-day-calories');
const foodQuantities = [...document.querySelectorAll('.food-quantity-all')];
const foodWelcomeSection = document.querySelector('.food-welcome-sec');
const foodMonth = document.querySelector('.food-chart-month');
const foodQuestion = document.querySelector('.better-circle');
const foodCaloriesDescription = document.querySelector(
  '.food-calories-description'
);

const ctxWeek = document.querySelector('#foodChartWeek').getContext('2d');
const ctxMonth = document.querySelector('#foodChartMonth').getContext('2d');

const gradientOne = ctxWeek.createLinearGradient(0, 0, 0, 600);
gradientOne.addColorStop(0, 'rgba(1, 223, 154, 0.5)');
gradientOne.addColorStop(1, 'rgba(1, 223, 154, 0)');

const gradientTwo = ctxWeek.createLinearGradient(0, 0, 0, 600);
gradientTwo.addColorStop(0, 'rgba(60, 93, 199, 0.8)');
gradientTwo.addColorStop(1, 'rgba(60, 93, 199, 0)');

const labels = ['Пон.', 'Вто.', 'Сря.', 'Чет.', 'Пет.', 'Съб.', 'Нед.'];
const labelsMonth = ['Седмица 1', 'Седмица 2', 'Седмица 3', 'Седмица 4'];

const caloriesWeek = [0, 3241, 2874, 3235, 5547, 2431, 1975];
const caloriesMonth = [0, 23241, 2874, 25235, 20547, 15431, 3975];

new Chart(ctxWeek, {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        data: caloriesWeek,
        backgroundColor: gradientOne,
        borderWidth: 2,
        borderColor: '#01df9a',
        fill: true,
        bezierCurve: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: '#303133',
        },
        ticks: {
          stepSize: 1000,
          color: '#fff',
        },
      },
      x: {
        ticks: {
          color: '#fff',
        },
      },
    },
  },
});

new Chart(ctxMonth, {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        data: caloriesMonth,
        backgroundColor: gradientTwo,
        borderWidth: 2,
        borderColor: 'rgba(60, 93, 199, 1)',
        fill: true,
        bezierCurve: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      labels: {
        fontColor: '#fff',
      },
    },
    scales: {
      y: {
        grid: {
          color: '#303133',
        },
        ticks: {
          stepSize: 5000,
          color: '#fff',
        },
      },
      x: {
        ticks: {
          color: '#fff',
        },
      },
    },
  },
});

// Date
const now = new Date();

let day = now.getDay();
if (day === 0) day = 'Неделя';
if (day === 1) day = 'Понеделник';
if (day === 2) day = 'Вторник';
if (day === 3) day = 'Сряда';
if (day === 4) day = 'Четвъртък';
if (day === 5) day = 'Петък';
if (day === 6) day = 'Събота';

const monthDate = now.getDate();

let month = now.getMonth();
if (month === 0) month = 'Януари';
if (month === 1) month = 'Февруари';
if (month === 2) month = 'Март';
if (month === 3) month = 'Април';
if (month === 4) month = 'Май';
if (month === 5) month = 'Юни';
if (month === 6) month = 'Юли';
if (month === 7) month = 'Август';
if (month === 8) month = 'Септември';
if (month === 9) month = 'Октомври';
if (month === 10) month = 'Ноември';
if (month === 11) month = 'Декември';

date.textContent = `${day}, ${monthDate} ${month}`;
foodMonth.textContent = month;

// Dropdown
const selectFoodType = document.querySelector('.food-type-choose');

const toggleFoodType = function (e) {
  document.querySelector(`.${e.target.value}`).classList.remove('hidden');

  const arrTypes = [
    'food-none',
    'food-pork',
    'food-sheep',
    'food-goat',
    'food-pig',
    'food-chicken',
  ];

  document
    .querySelectorAll('.food-selection')
    .forEach(foodEl => (foodEl.value = '0'));

  arrTypes.forEach((type, i) => {
    {
      if (type === e.target.value) arrTypes.splice(i, 1);
    }
  });

  arrTypes.forEach(type =>
    document.querySelector(`.${type}`).classList.add('hidden')
  );
};

selectFoodType.addEventListener('change', toggleFoodType);

// AJAX Calls
const ftAPI = 'https://api.fthub.eu';
// const ftAPI = 'http://localhost:3000';

const ftOptions = {
  headers: {
    Authorization: 'Bearer mMziYvIpk8UxHapHLloQhlxRhOjXmyZ8',
  },
};

const renderFood = function (data, div, qty = 100, img = false) {
  div.querySelector('.food-name').textContent = data.recepts[0].name;
  div.querySelector('.food-calories').textContent = `${(
    (data.recepts[0].energy / parseInt(data.recepts[0].portion)) *
    qty
  ).toFixed(2)} kcal`;
  div.querySelector('.food-carbohydrates').textContent = `${(
    (data.recepts[0].carbohydrate / parseInt(data.recepts[0].portion)) *
    qty
  ).toFixed(2)} g`;
  div.querySelector('.food-proteins').textContent = `${(
    (data.recepts[0].protein / parseInt(data.recepts[0].portion)) *
    qty
  ).toFixed(2)} g`;
  div.querySelector('.food-fats').textContent = `${(
    (data.recepts[0].fat / parseInt(data.recepts[0].portion)) *
    qty
  ).toFixed(2)} g`;

  img &&
    div.querySelector('.food-img').setAttribute('src', data.recepts[0].image);
};

const foodResults = async function () {
  if (noFoodContent) return;
  const foodName = foodInfo.querySelector('.food-name').textContent.trim();

  const res = await fetch(
    `${ftAPI}/api/v1/recepts?search=${foodName}`,
    ftOptions
  );
  const { data } = await res.json();

  const quantity = foodInfo.querySelector('.food-hidden-qty');
  console.log(data);
  renderFood(data, foodInfo, +quantity.value, true);
};
foodResults();

const dropResults = async function () {
  const foodQuery = foodNames.map(foodName => foodName.textContent).join(',');
  const res = await fetch(
    `${ftAPI}/api/v1/recepts?search=${foodQuery}`,
    ftOptions
  );
  const { data } = await res.json();

  if (foodQuantities.length >= 1) {
    const totalCalories = data.recepts.reduce(
      (acc, receptObj, i) =>
        (receptObj.energy / parseInt(receptObj.portion)) *
          parseInt(foodQuantities[i].textContent) +
        acc,
      0
    );
    foodDayCalories.textContent = totalCalories.toFixed(2);
  }

  const detailsDrop = function (e) {
    const btnDataset = e.target.getAttribute('data-open');
    if (btnDataset === 'false') e.target.setAttribute('data-open', 'true');
    else e.target.setAttribute('data-open', 'false');

    const isOpen = btnDataset === 'false' ? false : true;
    const arrowDown = e.target
      .closest('.food-item-row')
      .querySelector('.food-row-dropdown-wrapper');

    if (isOpen) {
      arrowDown.style.height = '100%';
      arrowDown.classList.remove('hidden');
      e.target.style.transform = 'rotate(-180deg)';
      e.target.style.transition = '0.3s';

      const targetName = e.target
        .closest('.food-item-row')
        .querySelector('.food-history-name').textContent;

      const matchedResult = data.recepts.find(obj => obj.name === targetName);
      const fakeDataObj = { recepts: [matchedResult] };

      renderFood(
        fakeDataObj,
        e.target.closest('.food-item-row').querySelector('.food-row-standart'),
        parseInt(
          e.target.closest('.food-item-row').querySelector('.food-quantity-col')
            .textContent
        )
      );
    } else {
      arrowDown.style.height = '0%';
      arrowDown.classList.add('hidden');
      e.target.style.transform = 'rotate(-360deg)';
      e.target.style.transition = '0.3s';
    }
  };

  btnDropDetails.forEach(btn => btn.addEventListener('click', detailsDrop));
};
dropResults();

const searchFoodResults = async function (e) {
  if (!searchBar.value) return;
  spinner.classList.remove('hidden');
  foodResult.classList.add('hidden');

  const res = await fetch(
    `${ftAPI}/api/v1/recepts?search=${searchBar.value}&fields=-description`,
    ftOptions
  );
  const { data } = await res.json();
  spinner.classList.add('hidden');

  if (data.recepts.length === 0) return noResults.classList.remove('hidden');
  else noResults.classList.add('hidden');

  foodResult.classList.remove('hidden');
  renderFood(data, foodResult, 100, true);
};

btnSearch.addEventListener('click', searchFoodResults);

// Mobile nav scroll
const options = {
  root: null,
  threshold: 0,
};

const stickyMenu = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) navMenu.style.transform = 'translateY(0%)';
  else navMenu.style.transform = 'translateY(100%)';
};

const observer = new IntersectionObserver(stickyMenu, options);
observer.observe(foodWelcomeSection);
