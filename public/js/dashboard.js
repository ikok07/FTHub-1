'use strict';

// CHARTS
const ctx = document.querySelector('.doughnutChart');

const data = {
  labels: ['Фитнес', 'Тичане', 'Плуване'],
  datasets: [
    {
      label: 'Тренировки',
      data: [300, 50, 100],
      backgroundColor: ['#298528', '#0B8F72', '#277D9C'],
      hoverOffset: 4,
    },
  ],
};

const config = {
  type: 'doughnut',
  data: data,
  options: {
    elements: {
      arc: {
        borderWidth: [0, 0, 0],
      },
    },
  },
};

const firstChart = new Chart(ctx, config);

// history chart
const ctx2 = document.querySelector('.historyChart');

const historyChart = new Chart(ctx2, {
  type: 'line',

  data: {
    labels: [
      'Понеделник',
      'Вторник',
      'Сряда',
      'Четвъртък',
      'Петък',
      'Събота',
      'Неделя',
      'Понеделник',
    ],
    datasets: [
      {
        label: 'Продължителност на последни тренировки в минути',
        data: [25, 40, 65, 32, 70, 72, 75, 45],
        borderColor: '#01df9a',
      },
      {
        label: 'Тест2',
        data: [10, 15, 20, 30, 35, 40, 45, 50],
        borderColor: '#fff',
      },
    ],
  },
  options: {
    elements: {
      line: {
        bezierCurve: true,
        tension: 0.2,
      },
    },
  },
});
