'use strict';

// Selections
const navigation = document.querySelector('.nav');
const links = [...document.querySelectorAll('.nav__link')];
const nav = document.querySelector('.nav-buttons');
const imgTargets = document.querySelectorAll('img[data-src]');
const item = document.querySelectorAll('.pricing-item');
const appFeatures = [
  document.querySelector('.training-info'),
  document.querySelector('.food-info'),
  document.querySelector('.calculator-info'),
];
const mobileFeatures = [...document.querySelectorAll('.mobile-feature')];
const loadingBar = [...document.querySelectorAll('.load-line')];
const loadingElements = document.querySelector('.features-row2');
const img = document.querySelector('.dashboard-img img');
const btns = document.querySelectorAll('.plan-selector');
const allItems = document.querySelector('.selected-plan');
const navOpen = document.querySelector('.nav-open');
const media = window.matchMedia('(min-width: 769px)');

// Typing animation
const typed = new Typed('.type-animation', {
  strings: ['треньора', 'спортиста', 'състезателя'],
  typeSpeed: 110,
  backSpeed: 80,
  loop: true,
});

// Smooth scrolling
links.forEach(link =>
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
);

if (window.location.hash === '#section-3')
  document.querySelector('#section-3').scrollIntoView({ behavior: 'smooth' });

// Fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link
      .closest('.nav-buttons')
      .querySelectorAll('.nav__link');
    const logo = link.closest('.index-header').querySelector('.logo-a');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Lazy loading images
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Mobile-pricing-swiper
btns[0].style.backgroundColor = '#027e57';
btns.forEach((btn, i) => {
  btn.addEventListener('click', function () {
    if (i === 0) {
      allItems.style.transform = 'translateX(0)';
      btns[0].style.backgroundColor = '#027e57';
      btns[1].style.backgroundColor = 'transparent';
      btns[2].style.backgroundColor = 'transparent';
    }

    if (i === 1) {
      allItems.style.transform = 'translateX(-100%)';
      btns[1].style.backgroundColor = '#027e57';
      btns[0].style.backgroundColor = 'transparent';
      btns[2].style.backgroundColor = 'transparent';
    }

    if (i === 2) {
      allItems.style.transform = 'translateX(-200%)';
      btns[2].style.backgroundColor = '#027e57';
      btns[1].style.backgroundColor = 'transparent';
      btns[0].style.backgroundColor = 'transparent';
    }
  });
});

// Features-section
if (media.matches) {
  let line,
    interval,
    startPercent = 0;

  const loading = function () {
    startPercent += 0.1;
    line.style.width = `${startPercent}%`;
    if (startPercent >= 99.9) {
      clearInterval(interval);
      startPercent = 0;

      const curFeature = appFeatures.indexOf(line.closest('.food-parent'));
      if (curFeature === 0) line = appFeatures[1];
      if (curFeature === 1) line = appFeatures[2];
      if (curFeature === 2) line = appFeatures[0];
      const fakeEventObj = { target: line };
      toggleLine(fakeEventObj);
    }
  };

  const loadLine = function (clickedFeatureLine) {
    line = clickedFeatureLine;
    interval = setInterval(loading, 10);
  };

  const toggleLine = function (e) {
    clearInterval(interval);
    startPercent = 0;

    const clickedFeature = e.target.closest('.food-parent');
    const remainingFeatures = appFeatures.filter(
      feature => feature !== clickedFeature
    );
    const featureIndex = appFeatures.indexOf(clickedFeature);

    loadingElements.style.gridTemplateColumns = `${
      featureIndex === 0 ? 1 : 0.5
    }fr ${featureIndex === 1 ? 1 : 0.5}fr ${featureIndex === 2 ? 1 : 0.5}fr`;

    clickedFeature.querySelector('.load-line').dataset.active = 1;
    clickedFeature.querySelector('.info-text').classList.remove('hidden');
    clickedFeature.querySelector('.info-title').classList.add('active-header');

    remainingFeatures.forEach(remainingFeature => {
      remainingFeature.querySelector('.load-line').dataset.active = 0;
      remainingFeature.querySelector('.load-line').style.width = 0;
      remainingFeature.querySelector('.info-text').classList.add('hidden');
      remainingFeature
        .querySelector('.info-title')
        .classList.remove('active-header');
    });

    loadLine(clickedFeature.querySelector('.load-line'));
  };

  toggleLine({ target: appFeatures[0] });
  appFeatures.forEach(feature => feature.addEventListener('click', toggleLine));
} else {
  let line,
    interval,
    startPercent = 0;

  const loading = function () {
    startPercent += 0.1;
    line.style.width = `${startPercent}%`;
    if (startPercent >= 99.9) {
      clearInterval(interval);
      startPercent = 0;

      const curFeature = appFeatures.indexOf(line.closest('.food-parent'));
      if (curFeature === 0) line = mobileFeatures[1];
      if (curFeature === 1) line = mobileFeatures[2];
      if (curFeature === 2) line = mobileFeatures[0];
      const fakeEventObj = { target: line };
      toggleLine(fakeEventObj);
    }
  };

  const loadLine = function (clickedFeatureLine) {
    line = clickedFeatureLine;
    interval = setInterval(loading, 10);
  };

  const displayFeature = function (index) {
    appFeatures.forEach((feature, i) => {
      if (i === index) {
        feature.classList.remove('hidden');
        feature.querySelector('.info-text').classList.remove('hidden');
        feature.querySelector('.info-title').classList.add('active-header');
      } else {
        feature.classList.add('hidden');
        feature.querySelector('.info-text').classList.add('hidden');
        feature.querySelector('.info-title').classList.remove('active-header');
      }
    });
  };

  const toggleLine = function (e) {
    clearInterval(interval);
    startPercent = 0;

    const clickedFeature = e.target;
    const remainingFeatures = mobileFeatures.filter(
      feature => feature !== clickedFeature
    );

    clickedFeature.classList.add('selected');
    remainingFeatures.forEach(remainingFeature => {
      remainingFeature.classList.remove('selected');
    });

    if (clickedFeature.textContent === 'Тренировки') displayFeature(0);
    if (clickedFeature.textContent === 'Хранене') displayFeature(1);
    if (clickedFeature.textContent === 'Калкулатори') displayFeature(2);

    loadLine(
      appFeatures[+clickedFeature.classList[0].slice(-1) - 1].querySelector(
        '.load-line'
      )
    );
  };

  toggleLine({ target: mobileFeatures[0] });
  mobileFeatures.forEach(feature =>
    feature.addEventListener('click', toggleLine)
  );
}

// Image tilt
const options = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.5, 0.9],
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio >= 0) {
      img.classList.add('startScroll');
      img.classList.remove('firstScroll');
      img.classList.remove('secondScroll');
    }

    if (entry.intersectionRatio >= 0.5) {
      img.classList.remove('startScroll');
      img.classList.add('firstScroll');
    }

    if (entry.intersectionRatio >= 0.9 && entry.intersectionRatio < 1) {
      img.classList.remove('firstScroll');
      img.classList.add('secondScroll');
    }
  });
}, options);

observer.observe(img);
