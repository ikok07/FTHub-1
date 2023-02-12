'use strict';

const sportButton = [
  ...document.querySelectorAll('.after-account-sport-types-button'),
];
const continueButton3 = document.querySelector('.after-button3');
const hiddenArr = document.querySelector('.hiddenSports');
let sportsArr = hiddenArr.value.split(',');

const initSports = function () {
  sportButton.forEach(sportBtn => {
    const sportBtnValue = sportBtn.textContent.trim().slice(2);
    if (sportsArr.includes(sportBtnValue)) {
      sportBtn.value = '1';
      sportBtn.style.backgroundColor = '#01df9a';
    }
  });
};
initSports();

sportButton.forEach(sportBtn => {
  sportBtn.addEventListener('click', () => {
    const sportBtnValue = sportBtn.textContent.trim().slice(2);
    if (sportsArr.includes(sportBtnValue)) {
      const existingIndex = sportsArr.indexOf(sportBtnValue);
      sportsArr.splice(existingIndex, 1);
      sportBtn.value = '0';
      sportBtn.style.removeProperty('background-color');
    } else {
      sportsArr.push(sportBtnValue);
      sportBtn.value = '1';
      sportBtn.style.backgroundColor = '#01df9a';
    }

    hiddenArr.value = sportsArr;
  });
});

const panelButtons = document.querySelectorAll('.profile-page-choose-div');
const mobilePanelButtons = document.querySelectorAll('.mobile-navbut');
const smallData = document.querySelectorAll('.profile-panel-small');
const pageSwiper = document.querySelector('.profile-right-wrapper');
const eachPanelButton = [];
const eachSmallData = [];

if (window.screen.availWidth <= 768) {
  mobilePanelButtons.forEach((button, i) => {
    eachPanelButton[i] = button;
  });
} else {
  panelButtons.forEach((button, i) => {
    eachPanelButton[i] = button;
  });
}

smallData.forEach((button, i) => {
  eachSmallData[i] = button;
});

let panelRefresh1 = function (x, y, z) {
  const firstSettings = document.querySelector('.profile-right-column');
  let btn1 = x;
  let btn2 = y;
  let btn3 = z;
  let secondBtnStyle = function () {
    eachPanelButton[0].style.backgroundColor = 'transparent';
    eachPanelButton[0].style.borderLeft = 'none';
    eachPanelButton[0].style.transition = '0.1s';
    eachPanelButton[1].style.backgroundColor = '#111318';
    eachPanelButton[1].style.borderLeft = 'solid 5px #3c5dc7';
    eachPanelButton[1].style.transition = '0.1s';
    if (window.screen.availWidth > 768) {
      eachPanelButton[2].style.backgroundColor = 'transparent';
      eachPanelButton[2].style.borderLeft = 'none';
      eachPanelButton[2].style.transition = '0.1s';
    }
  };
  let firstBtnStyle = function () {
    eachPanelButton[0].style.backgroundColor = '#111318';
    eachPanelButton[0].style.borderLeft = 'solid 5px #3c5dc7';
    eachPanelButton[0].style.transition = '0.1s';
    eachPanelButton[1].style.backgroundColor = 'transparent';
    eachPanelButton[1].style.borderLeft = 'none';
    eachPanelButton[1].style.transition = '0.1s';
    if (window.screen.availWidth > 768) {
      eachPanelButton[2].style.backgroundColor = 'transparent';
      eachPanelButton[2].style.borderLeft = 'none';
      eachPanelButton[2].style.transition = '0.1s';
    }
  };
  let thirdBtnStyle = function () {
    eachPanelButton[0].style.backgroundColor = 'transparent';
    eachPanelButton[0].style.borderLeft = 'none';
    eachPanelButton[0].style.transition = '0.1s';
    eachPanelButton[1].style.backgroundColor = 'transparent';
    eachPanelButton[1].style.borderLeft = 'none';
    eachPanelButton[1].style.transition = '0.1s';
    if (window.screen.availWidth > 768) {
      eachPanelButton[2].style.backgroundColor = '#111318';
      eachPanelButton[2].style.borderLeft = 'solid 5px #3c5dc7';
      eachPanelButton[2].style.transition = '0.1s';
    }
  };
  if (btn2) {
    secondBtnStyle();
  } else if (btn1) {
    firstBtnStyle();
  } else {
    thirdBtnStyle();
  }
};
eachPanelButton[1].addEventListener('click', function () {
  if (window.screen.availWidth > 768) {
    panelRefresh1(false, true, false);
  }
  pageSwiper.style.transform = 'translateX(-100%)';
  pageSwiper.style.transition = '0.5s';
});
eachPanelButton[0].addEventListener('click', function () {
  if (window.screen.availWidth > 768) {
    panelRefresh1(true, false, false);
  }
  pageSwiper.style.transform = 'translateX(0%)';
  pageSwiper.style.transition = '0.5s';
});

eachPanelButton[2].addEventListener('click', function () {
  if (window.screen.availWidth > 768) {
    panelRefresh1(false, false, true);
  }
  pageSwiper.style.transform = 'translateX(-200%)';
  pageSwiper.style.transition = '0.5s';
});
