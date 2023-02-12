'use strict';

const chooseBtn = document.querySelector('.calculator-choose-button');
const dropdown = document.querySelector('.calculator-dropdown');
const dropdownBtns = document.querySelectorAll('.calculator-dropdown');

const bmiSelect = document.querySelector('.bmi-select');
const caloriesSelect = document.querySelector('.calories-select');
const fatSelect = document.querySelector('.fat-select');
const swiper = document.querySelector('.calculator-swiper');

const bmiButton = document.querySelector('.bmi-button');
const bmiDisplay = document.querySelector('.calculator-bmi-result');
const resultsDiv = document.querySelector('.calculator-results');
const manImg = document.querySelector('.manImg');
const bmiStatus = document.querySelector('.calculator-weight-type');
const bmiInfo = document.querySelector('.calculator-final-message-h6');

const caloriesButton = document.querySelector('.calories-button');
const fatButton = document.querySelector('.fat-button');

const fatDiv = document.querySelector('.fat-results-div');
const errDiv = document.querySelector('.fat-error-div');

const calorieValue = document.querySelector('.calories-final');
const calorieSecond = document.querySelector('.calories-second');
const calorieThird = document.querySelector('.calories-third');
const calorieFourth = document.querySelector('.calories-fourth');

const openDropdown = () => dropdown.classList.toggle('open-dropdown');

// Change Calculator
const openBmi = () => (swiper.style.transform = 'translateX(0%)');
const openCalories = () => (swiper.style.transform = 'translateX(-99%)');
const openFat = () => (swiper.style.transform = 'translateX(-200%)');

dropdownBtns.forEach(btn => btn.addEventListener('click', openDropdown));
chooseBtn.addEventListener('click', openDropdown);
bmiSelect.addEventListener('click', openBmi);
caloriesSelect.addEventListener('click', openCalories);
fatSelect.addEventListener('click', openFat);

// BMI Calculator
const displayBMI = function (src, color, status, description) {
  manImg.src = src;
  bmiDisplay.style.color = bmiStatus.style.color = color;
  bmiStatus.innerHTML = status;
  bmiInfo.innerHTML = description;
};

const calcBmi = function () {
  const heightInput = document.querySelector('.bmi-height').value;
  const weightInput = document.querySelector('.bmi-weight').value;

  if (heightInput <= 0 || weightInput <= 0) return;
  const bmi = ((weightInput / heightInput / heightInput) * 10000).toFixed(1);
  bmiDisplay.innerHTML = bmi;

  if (bmi > 0) resultsDiv.style.display = 'grid';
  if (bmi >= 18.5 && bmi <= 24.9)
    return displayBMI(
      'images/blurred/greenMan.png',
      '#01df9a',
      'Нормално тегло',
      'Вашето тегло е нормално за възрастта и характеристиките ви'
    );
  if (bmi >= 25 && bmi <= 29.9)
    return displayBMI(
      'images/blurred/yellowMan.png',
      '#efa00b',
      'Наднормено тегло',
      'Вашето тегло е леко наднормено. Опитвайте се да се храните по-здравословно, отделяйте повече време за спорт или разходки в природата'
    );
  if (bmi < 18.5)
    return displayBMI(
      'images/blurred/redMan.png',
      '#ff5964',
      'Поднормено тегло',
      'Вашето тегло е по-малко от нормалното за възрастта и характеристиките ви. Опитвайте се да се храните повече и да се движете повече'
    );
  if (bmi >= 30 && bmi <= 34.9)
    return displayBMI(
      'images/blurred/redMan.png',
      '#ff5964',
      'Затлъстяване - първа степен',
      'Вашето тегло е над нормалното за възрастта и характеристиките ви. Опитвайте се да се храните по-здравословно, като избягвате храни богати на въглехидрати, отделяйте повече време за спорт или разходки в природата'
    );
  if (bmi >= 35 && bmi <= 39.9)
    return displayBMI(
      'images/blurred/redMan.png',
      '#ff5964',
      'Затлъстяване - втора степен',
      'Вашето тегло е над нормалното за възрастта и характеристиките ви. Опитвайте се да се храните по-здравословно, като избягвате храни богати на въглехидрати, отделяйте повече време за спорт или разходки в природата'
    );
  if (bmi >= 40)
    return displayBMI(
      'images/blurred/redMan.png',
      '#ff5964',
      'Затлъстяване - трета степен',
      'Вашето тегло е над нормалното за възрастта и характеристиките ви. Опитвайте се да се храните по-здравословно, като избягвате храни богати на въглехидрати, отделяйте повече време за спорт или разходки в природата'
    );
};

bmiButton.addEventListener('click', calcBmi);

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// Calories Calculator

caloriesButton.addEventListener('click', function () {
  const caloriesAge = document.querySelector('.calories-age').value;
  const caloriesSex = +document.querySelector('.calories-sex').value;
  const caloriesHeight = document.querySelector('.calories-height').value;
  const caloriesWeight = document.querySelector('.calories-weight').value;

  const activityType = +document.querySelector('.calories-activity').value;
  const bmrWindow = document.querySelector('.bmr-table');
  const caloriesWindow = document.querySelector('.calories-results-table');

  if (
    caloriesSex === 0 ||
    caloriesHeight === 0 ||
    caloriesWeight === 0 ||
    caloriesAge === 0
  )
    caloriesWindow.style.display = 'none';
  else caloriesWindow.style.display = 'table';

  bmrWindow.style.display = 'none';

  if (activityType === -1) {
    bmrWindow.style.display = 'none';
    caloriesWindow.style.display = 'none';
  }

  if (activityType === 0) {
    const bmrValue = document.querySelector('.final-bmr');
    let bmrResult;

    if (caloriesSex === 1) {
      bmrResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge + 5;
    }

    if (caloriesSex === 2) {
      bmrResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge - 161;
    }
    bmrResult = Math.ceil(bmrResult);
    bmrValue.innerHTML = bmrResult;

    if (isNaN(bmrResult)) bmrWindow.style.display = 'none';
    else {
      bmrWindow.style.display = 'table';
      caloriesWindow.style.display = 'none';
    }
  }

  if (activityType === 1) {
    let calorieResult;

    if (caloriesSex === 1) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge + 5;
    }

    if (caloriesSex === 2) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge - 161;
    }
    calorieResult = calorieResult * 1.2;
    calorieResult = Math.ceil(calorieResult);
    calorieValue.innerHTML = calorieResult;
    calorieSecond.innerHTML = Math.ceil(0.87 * calorieResult);
    calorieThird.innerHTML = Math.ceil(0.75 * calorieResult);
    calorieFourth.innerHTML = Math.ceil(0.49 * calorieResult);
  }

  if (activityType === 2) {
    let calorieResult;

    if (caloriesSex === 1) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge + 5;
    }

    if (caloriesSex === 2) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge - 161;
    }
    calorieResult = calorieResult * 1.37;
    calorieResult = Math.ceil(calorieResult);
    calorieValue.innerHTML = calorieResult;
    calorieSecond.innerHTML = Math.ceil(0.89 * calorieResult);
    calorieThird.innerHTML = Math.ceil(0.78 * calorieResult);
    calorieFourth.innerHTML = Math.ceil(0.56 * calorieResult);
  }

  if (activityType === 3) {
    let calorieResult;

    if (caloriesSex === 1) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge + 5;
    }

    if (caloriesSex === 2) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge - 161;
    }

    calorieResult = calorieResult * 1.465;
    calorieResult = Math.ceil(calorieResult);
    calorieValue.innerHTML = calorieResult;
    calorieSecond.innerHTML = Math.ceil(0.9 * calorieResult);
    calorieThird.innerHTML = Math.ceil(0.79 * calorieResult);
    calorieFourth.innerHTML = Math.ceil(0.58 * calorieResult);
  }

  if (activityType === 4) {
    let calorieResult;
    if (caloriesSex === 1) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge + 5;
    }

    if (caloriesSex === 2) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge - 161;
    }
    calorieResult = calorieResult * 1.55;
    calorieResult = Math.ceil(calorieResult);
    calorieValue.innerHTML = calorieResult;
    calorieSecond.innerHTML = Math.ceil(0.9 * calorieResult);
    calorieThird.innerHTML = Math.ceil(0.8 * calorieResult);
    calorieFourth.innerHTML = Math.ceil(0.61 * calorieResult);
  }

  if (activityType === 5) {
    let calorieResult;
    if (caloriesSex === 1) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge + 5;
    }

    if (caloriesSex === 2) {
      calorieResult =
        10 * caloriesWeight + 6.25 * caloriesHeight - 5 * caloriesAge - 161;
    }

    calorieResult = calorieResult * 1.725;
    calorieResult = Math.ceil(calorieResult);
    calorieValue.innerHTML = calorieResult;
    calorieSecond.innerHTML = Math.ceil(0.91 * calorieResult);
    calorieThird.innerHTML = Math.ceil(0.82 * calorieResult);
    calorieFourth.innerHTML = Math.ceil(0.65 * calorieResult);
  }
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// Body Fat Calculator
const fatSex = +document.querySelector('.fat-sex').value;

if (fatSex === 1) {
  document.querySelector('.calculator-hip').style.display = 'none';
  document.querySelector('.fat-graphic').style.gridTemplateColumns =
    '4% 8% 16% 8% 14% 50%';
} else {
  document.querySelector('.calculator-hip').style.display = 'flex';
  document.querySelector('.fat-graphic').style.gridTemplateColumns =
    '20% 8% 14% 8% 14% 32%';
}

const calcFat = function () {
  const finalResultDiv = document.querySelector('.fat-final-number');
  fatDiv.style.display = 'none';
  errDiv.style.display = 'block';

  if (fatSex === 1) {
    const fatAge = document.querySelector('.fat-age').value;
    const fatHeight = document.querySelector('.fat-height').value;
    const fatWeight = document.querySelector('.fat-weight').value;
    const fatWaist = document.querySelector('.fat-waist').value;
    const fatNeck = document.querySelector('.fat-neck').value;
    const bfp =
      495 /
        (1.0324 -
          0.19077 * Math.log10(fatWaist - fatNeck) +
          0.15456 * Math.log10(fatHeight)) -
      450;
    const finalBfp = Math.round(bfp * 10) / 10;

    if (finalBfp < 0 || finalBfp > 48.9 || isNaN(finalBfp)) {
      fatDiv.style.display = 'none';
      errDiv.style.display = 'block';
      return;
    }

    fatDiv.style.display = 'block';
    errDiv.style.display = 'none';
    finalResultDiv.innerHTML = finalBfp + '%';

    // Table
    const fatKg = document.querySelector('.fatKg');
    const withoutFat = document.querySelector('.withoutFat');
    fatKg.innerHTML = ((finalBfp / 100) * fatWeight).toFixed(1) + ' ' + 'кг.';
    withoutFat.innerHTML =
      (fatWeight - (finalBfp / 100) * fatWeight).toFixed(1) + ' ' + 'кг.';
    const idealFat = document.querySelector('.idealFat');

    if (finalBfp <= 4.9) {
      document.querySelector('.fatType').innerHTML = 'Слаб';
    } else if (finalBfp >= 5 && finalBfp <= 12.9) {
      document.querySelector('.fatType').innerHTML = 'Атлет';
    } else if (finalBfp >= 13 && finalBfp <= 17.9) {
      document.querySelector('.fatType').innerHTML = 'Фитнес';
    } else if (finalBfp >= 18 && finalBfp <= 23.9) {
      document.querySelector('.fatType').innerHTML = 'Средна';
    } else {
      document.querySelector('.fatType').innerHTML = 'Затлъстяване';
    }

    if (fatAge >= 20 && fatAge <= 25) {
      idealFat.innerHTML = (0.4 * (fatAge - 20) + 8.5).toFixed(1) + '%';
    } else if (fatAge >= 25 && fatAge <= 30) {
      idealFat.innerHTML = (0.44 * (fatAge - 25) + 10.5).toFixed(1) + '%';
    } else if (fatAge >= 30 && fatAge <= 35) {
      idealFat.innerHTML = (0.2 * (fatAge - 30) + 12.7).toFixed(1) + '%';
    } else if (fatAge >= 35 && fatAge <= 40) {
      idealFat.innerHTML = (0.32 * (fatAge - 35) + 13.7).toFixed(1) + '%';
    } else if (fatAge >= 40 && fatAge <= 45) {
      idealFat.innerHTML = (0.22 * (fatAge - 40) + 15.3).toFixed(1) + '%';
    } else if (fatAge >= 45 && fatAge <= 50) {
      idealFat.innerHTML = (0.5 * (fatAge - 45) + 16.4).toFixed(1) + '%';
    } else if (fatAge >= 50 && fatAge <= 55) {
      idealFat.innerHTML = (0.2 * (fatAge - 50) + 18.9).toFixed(1) + '%';
    } else {
      document.querySelector('.idealFatRow').style.display = 'none';
    }
    const fatToLose = document.querySelector('.fatToLose');
    fatToLose.innerHTML =
      (((finalBfp - parseFloat(idealFat.innerHTML)) / 100) * fatWeight).toFixed(
        1
      ) +
      ' ' +
      'кг.';
    const fatArrow = document.querySelector('.fat-arrow');
    const fatGraphic = document.querySelector('.fat-graphic');
    const arrowMargin = fatGraphic.offsetWidth * ((finalBfp * 2) / 100);
    fatArrow.style.marginLeft = arrowMargin + 'px';
  } else {
    const fatAge = document.querySelector('.fat-age').value;
    const fatHeight = document.querySelector('.fat-height').value;
    const fatWeight = document.querySelector('.fat-weight').value;
    const fatWaist = document.querySelector('.fat-waist').value;
    const fatNeck = document.querySelector('.fat-neck').value;
    const fatHip = document.querySelector('.fat-hip').value;
    const bfp =
      495 /
        (1.29579 -
          0.35004 * Math.log10(+fatWaist + +fatHip - +fatNeck) +
          0.221 * Math.log10(fatHeight)) -
      450;
    const finalBfp = Math.round(bfp * 10) / 10;

    if (finalBfp < 0 || finalBfp > 48.9 || isNaN(finalBfp)) {
      fatDiv.style.display = 'none';
      errDiv.style.display = 'block';
      return;
    }

    fatDiv.style.display = 'block';
    errDiv.style.display = 'none';
    finalResultDiv.innerHTML = finalBfp + '%';

    if (finalBfp <= 12.9) {
      document.querySelector('.fatType').innerHTML = 'Слаб';
    } else if (finalBfp >= 13 && finalBfp <= 19.9) {
      document.querySelector('.fatType').innerHTML = 'Атлет';
    } else if (finalBfp >= 20 && finalBfp <= 23.9) {
      document.querySelector('.fatType').innerHTML = 'Фитнес';
    } else if (finalBfp >= 24 && finalBfp <= 30.9) {
      document.querySelector('.fatType').innerHTML = 'Средна';
    } else {
      document.querySelector('.fatType').innerHTML = 'Затлъстяване';
    }

    const fatKg = document.querySelector('.fatKg');
    const withoutFat = document.querySelector('.withoutFat');

    fatKg.innerHTML = ((finalBfp / 100) * fatWeight).toFixed(1) + ' ' + 'кг.';
    withoutFat.innerHTML =
      (fatWeight - (finalBfp / 100) * fatWeight).toFixed(1) + ' ' + 'кг.';
    const idealFat = document.querySelector('.idealFat');
    document.querySelector('.idealFatRow').style.display = 'table-row';
    if (fatAge >= 20 && fatAge <= 25) {
      idealFat.innerHTML = (0.14 * (fatAge - 20) + 17.7).toFixed(1) + '%';
    } else if (fatAge >= 25 && fatAge <= 30) {
      idealFat.innerHTML = (0.18 * (fatAge - 25) + 18.4).toFixed(1) + '%';
    } else if (fatAge >= 30 && fatAge <= 35) {
      idealFat.innerHTML = (0.44 * (fatAge - 30) + 19.3).toFixed(1) + '%';
    } else if (fatAge >= 35 && fatAge <= 40) {
      idealFat.innerHTML = (0.14 * (fatAge - 35) + 21.5).toFixed(1) + '%';
    } else if (fatAge >= 40 && fatAge <= 45) {
      idealFat.innerHTML = (0.14 * (fatAge - 40) + 22.2).toFixed(1) + '%';
    } else if (fatAge >= 45 && fatAge <= 50) {
      idealFat.innerHTML = (0.46 * (fatAge - 45) + 22.9).toFixed(1) + '%';
    } else if (fatAge >= 50 && fatAge <= 55) {
      idealFat.innerHTML = (0.22 * (fatAge - 50) + 25.2).toFixed(1) + '%';
    } else {
      document.querySelector('.idealFatRow').style.display = 'none';
    }

    const fatToLose = document.querySelector('.fatToLose');
    fatToLose.innerHTML = `${(
      ((finalBfp - parseFloat(idealFat.innerHTML)) / 100) *
      fatWeight
    ).toFixed(1)} кг.`;

    const fatArrow = document.querySelector('.fat-arrow');
    const fatGraphic = document.querySelector('.fat-graphic');
    const arrowMargin = fatGraphic.offsetWidth * ((finalBfp * 2) / 100);
    fatArrow.style.marginLeft = arrowMargin + 'px';
  }
};

fatButton.addEventListener('click', calcFat);
