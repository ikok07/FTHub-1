const img = document.querySelector('.dashboard-img img');

// Image tilt
const options = {
  root: null,
  rootMargin: '0px',
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    console.log(entry.intersectionRatio);
    if (entry.intersectionRatio >= 0.1) {
      img.classList.add('startScroll');
      img.classList.remove('firstScroll');
      img.classList.remove('secondScroll');
    }

    if (entry.intersectionRatio >= 0.8) {
      img.classList.remove('startScroll');
      img.classList.add('firstScroll');
    }

    if (entry.intersectionRatio >= 0.7) {
      img.classList.remove('firstScroll');
      img.classList.add('secondScroll');
    }
  });
}, options);

observer.observe(img);
