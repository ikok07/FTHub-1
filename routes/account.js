const accountController = require('../controllers/account');
const express = require('express');
const router = express.Router();

router.get('/account-signup', accountController.getSignup);

router.post('/signup', accountController.postSignup);

router.get('/account', accountController.getAccount);

router.post('/save-account', accountController.postAccountSave);

router.post('/change-name', accountController.postAccountChangeName);

router.post('/change-email', accountController.postAccountChangeEmail);

router.post('/change-password', accountController.postAccountChangePassword);

router.post('/login', accountController.postAccountLogin);

router.get('/reset-password', accountController.getReset);

router.post('/reset', accountController.postReset);

router.get('/reset-password/:token', accountController.getNewPassword);

router.post('/new-password', accountController.postNewPassword);

router.post('/logout', accountController.postAccountLogout);

module.exports = router;
