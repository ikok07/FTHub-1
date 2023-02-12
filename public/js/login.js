'use strict';

// Selections
const passwordField = document.querySelector('.login-password-input');
const passwordFieldBtn = document.querySelector('.eye-button');

const passwordFieldBtnAvailable = document.querySelector('#available');
const passwordFieldBtnForbidden = document.querySelector('#forbiddenEye');

// Toggle password view
const togglePasswordView = function (e) {
  e.preventDefault();
  if (passwordField.type === 'text') {
    passwordFieldBtnAvailable.style.display = '';
    passwordFieldBtnForbidden.style.display = 'none';
    passwordField.setAttribute('type', 'password');
  } else {
    passwordFieldBtnAvailable.style.display = 'none';
    passwordFieldBtnForbidden.style.display = 'block';
    passwordField.setAttribute('type', 'text');
  }
};

passwordFieldBtn.addEventListener('click', togglePasswordView);

// Messages
const msgDiv = document.querySelectorAll('.msg-div');
const registerBut = document.querySelector('.reg-button');
