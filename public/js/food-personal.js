'use strict';

const foodPersonal = document.querySelector('.food-personal');
const foodSummary = document.querySelector('.food-summary');

foodSummary.classList.remove('phase-active-span');
foodPersonal.classList.add('phase-active-span');

// target-chart

const ctx = document.getElementById('personalChart').getContext('2d');

new Chart(ctx, {
  type: 'pie',
  data: {
    datasets: [
      {
        data: [20, 34, 47],
        borderWidth: 1,
        backgroundColor: ['#9b6acf', '#62c5c2', '#ffb42f'],
      },
    ],
  },
  options: {
    //maintainAspectRatio: false,
    showDatasetLabels: true,
    legend: {
      display: true,
      position: 'bottom',
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
      },
    },
  },
});
