const User = require('../models/user');
const UserDetails = require('../models/user-details');
const UserDailyMeals = require('../models/user-daily-meals');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const validator = require('validator');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
    },
  })
);

exports.getSignup = (req, res, next) => {
  res.status(200).render('account/account-register', {
    pageTitle: 'Регистрация',
    index: false,
    accountLogin: false,
    accountDetails: false,
    accountPage: false,
    errMessage: null,
    successMessage: null,
    dashboard: false,
    calculator: false,
    food: false,
    foodDetails: false,
    foodPersonal: false,
  });
};

exports.postSignup = (req, res, next) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const { confirmPassword } = req.body;
  const fullName = `${firstName} ${lastName}`;

  if (!firstName || !lastName || !email || !password || !confirmPassword)
    return res.status(200).render('account/account-register', {
      pageTitle: 'Регистрация',
      index: false,
      accountLogin: false,
      accountDetails: false,
      accountPage: false,
      errMessage: 'Моля попълнете всички полета!',
      successMessage: null,
      dashboard: false,
      calculator: false,
      food: false,
      foodDetails: false,
      foodPersonal: false,
    });

  if (!validator.isEmail(email))
    return res.status(200).render('account/account-register', {
      pageTitle: 'Регистрация',
      index: false,
      accountLogin: false,
      accountDetails: false,
      accountPage: false,
      errMessage: 'Моля въведете валиден имейл!',
      successMessage: null,
      dashboard: false,
      calculator: false,
      food: false,
      foodDetails: false,
      foodPersonal: false,
    });

  if (password.length < 8 || password.length > 16)
    return res.status(200).render('account/account-register', {
      pageTitle: 'Регистрация',
      index: false,
      accountLogin: false,
      accountDetails: false,
      accountPage: false,
      errMessage: 'Паролата трябва да е от 8 до 16 знака!',
      successMessage: null,
      dashboard: false,
      calculator: false,
      food: false,
      foodDetails: false,
      foodPersonal: false,
    });

  User.findOne({ where: { email } }).then(user => {
    if (!user) {
      if (!(password === confirmPassword))
        return res.status(200).render('account/account-register', {
          pageTitle: 'Регистрация',
          index: false,
          accountLogin: false,
          accountDetails: false,
          accountPage: false,
          errMessage: 'Паролите не съвпадат',
          successMessage: null,
          dashboard: false,
          calculator: false,
          food: false,
          foodDetails: false,
          foodPersonal: false,
        });
      else {
        bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              name: fullName,
              email: email,
              password: hashedPassword,
              paidLevel: 1,
            });
            return user.save();
          })
          .then(user => {
            const userDetails = new UserDetails({
              born: null,
              sex: null,
              height: null,
              kg: null,
              userId: user.id,
            });
            return userDetails.save();
          })
          .then(userDetails => {
            const userDailyMeals = new UserDailyMeals({
              mealsToday: null,
              mealsYesterday: null,
              userId: userDetails.userId,
            });
            return userDailyMeals.save();
          })
          .then(result => {
            return res.status(200).render('account/account-register', {
              pageTitle: 'Регистрация',
              index: false,
              accountLogin: false,
              accountDetails: false,
              accountPage: false,
              errMessage: null,
              successMessage: 'Успешна регистрация',
              dashboard: false,
              calculator: false,
              food: false,
              foodDetails: false,
              foodPersonal: false,
            });
          });
      }
    } else {
      res.status(200).render('account/account-register', {
        pageTitle: 'Регистрация',
        index: false,
        accountLogin: false,
        accountDetails: false,
        accountPage: false,
        errMessage: 'Вече има акаунт с този имейл. Моля опитайте с друг!',
        successMessage: null,
        dashboard: false,
        calculator: false,
        food: false,
        foodDetails: false,
        foodPersonal: false,
      });
    }
  });
};

exports.getAccount = (req, res, next) => {
  if (!req.user) {
    return res.status(200).render('account/account', {
      pageTitle: 'Влез в профила си',
      index: false,
      accountLogin: true,
      accountDetails: false,
      accountPage: false,
      errMessage: null,
      successMessage: null,
      user: null,
      dashboard: false,
      calculator: false,
      food: false,
      foodDetails: false,
      foodPersonal: false,
    });
  } else {
    User.findOne({ where: { id: req.user.id } }).then(user => {
      UserDetails.findOne({ where: { userId: user.id } }).then(userDetails => {
        return res.status(200).render('account/account', {
          pageTitle: 'Акаунт',
          index: false,
          accountLogin: false,
          accountDetails: false,
          accountPage: true,
          errMessage: null,
          successMessage: null,
          dashboard: false,
          user,
          userDetails,
          sports: userDetails.sports ? userDetails.sports.split(',') : 0,
          calculator: false,
          food: false,
          foodDetails: false,
          foodPersonal: false,
        });
      });
    });
  }
};

exports.postAccountSave = (req, res, next) => {
  const { born } = req.body;
  const { sex } = req.body;
  const { height } = req.body;
  const { weight } = req.body;
  const { allSports } = req.body;

  UserDetails.findOne({ where: { userId: req.user.id } })
    .then(userDetails => {
      if (
        userDetails.born !== +born ||
        userDetails.sex !== sex ||
        userDetails.height !== +height ||
        userDetails.kg !== +weight ||
        userDetails.sports !== allSports
      ) {
        return userDetails
          .update({
            born,
            sex,
            height,
            kg: weight,
            sports: allSports,
          })
          .then(result => {
            res.redirect('/account');
          });
      } else {
        res.redirect('/account');
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postAccountChangeName = (req, res, next) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const name = `${firstName} ${lastName}`;

  if (firstName && lastName) {
    if (name.split(' ').length === 2) {
      User.findOne({ where: { id: req.user.id } })
        .then(user => {
          UserDetails.findOne({ where: { userId: user.id } }).then(
            userDetails => {
              return user.update({ name }).then(result => {
                res.render('account/account', {
                  pageTitle: 'Акаунт',
                  index: false,
                  accountLogin: false,
                  accountDetails: false,
                  accountPage: true,
                  errMessage: null,
                  successMessage: 'Успешно променено име!',
                  dashboard: false,
                  user,
                  userDetails,
                  sports: userDetails.sports
                    ? userDetails.sports.split(',')
                    : 0,
                  calculator: false,
                  food: false,
                  foodDetails: false,
                  foodPersonal: false,
                });
              });
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      User.findOne({ where: { id: req.user.id } })
        .then(user => {
          UserDetails.findOne({ where: { userId: user.id } }).then(
            userDetails => {
              return res.render('account/account', {
                pageTitle: 'Акаунт',
                index: false,
                accountLogin: false,
                accountDetails: false,
                accountPage: true,
                errMessage: 'Моля въведете само две имена!',
                successMessage: null,
                dashboard: false,
                user,
                userDetails,
                sports: userDetails.sports ? userDetails.sports.split(',') : 0,
                calculator: false,
                food: false,
                foodDetails: false,
                foodPersonal: false,
              });
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  } else {
    return User.findOne({ where: { id: req.user.id } })
      .then(user => {
        UserDetails.findOne({ where: { userId: user.id } }).then(
          userDetails => {
            return res.render('account/account', {
              pageTitle: 'Акаунт',
              index: false,
              accountLogin: false,
              accountDetails: false,
              accountPage: true,
              errMessage: 'Моля въведете две имена!',
              successMessage: null,
              dashboard: false,
              user,
              userDetails,
              sports: userDetails.sports ? userDetails.sports.split(',') : 0,
              calculator: false,
              food: false,
              foodDetails: false,
              foodPersonal: false,
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};

exports.postAccountChangeEmail = (req, res, next) => {
  const { newEmail } = req.body;

  if (newEmail) {
    User.findOne({ where: { id: req.user.id } })
      .then(user => {
        if (!(user.email === newEmail))
          return user.update({ email: newEmail }).then(user => {
            UserDetails.findOne({ where: { userId: user.id } })
              .then(userDetails => {
                return res.render('account/account', {
                  pageTitle: 'Акаунт',
                  index: false,
                  accountLogin: false,
                  accountDetails: false,
                  accountPage: true,
                  errMessage: null,
                  successMessage: 'Успешно променихте своя имейл!',
                  dashboard: false,
                  user,
                  userDetails,
                  sports: userDetails.sports
                    ? userDetails.sports.split(',')
                    : 0,
                  calculator: false,
                  food: false,
                  foodDetails: false,
                  foodPersonal: false,
                });
              })
              .catch(err => {
                console.log(err);
              });
          });
        else {
          UserDetails.findOne({ where: { userId: user.id } })
            .then(userDetails => {
              return res.render('account/account', {
                pageTitle: 'Акаунт',
                index: false,
                accountLogin: false,
                accountDetails: false,
                accountPage: true,
                errMessage: 'Моля въведете имейл, различен от вашия!',
                successMessage: null,
                dashboard: false,
                user,
                userDetails,
                sports: userDetails.sports ? userDetails.sports.split(',') : 0,
                calculator: false,
                food: false,
                foodDetails: false,
                foodPersonal: false,
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    User.findOne({ where: { id: req.user.id } })
      .then(user => {
        UserDetails.findOne({ where: { userId: user.id } }).then(
          userDetails => {
            return res.render('account/account', {
              pageTitle: 'Акаунт',
              index: false,
              accountLogin: false,
              accountDetails: false,
              accountPage: true,
              errMessage: 'Моля въведете имейл!',
              successMessage: null,
              dashboard: false,
              user,
              userDetails,
              sports: userDetails.sports ? userDetails.sports.split(',') : 0,
              calculator: false,
              food: false,
              foodDetails: false,
              foodPersonal: false,
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};

exports.postAccountChangePassword = (req, res, next) => {
  const { oldPassword } = req.body;
  const { newPassword } = req.body;

  if (oldPassword && newPassword) {
    User.findOne({ where: { id: req.user.id } }).then(user => {
      bcrypt.compare(oldPassword, user.password).then(doMatch => {
        if (doMatch) {
          bcrypt.hash(newPassword, 12).then(hashedPassword => {
            return user.update({ password: hashedPassword }).then(result => {
              UserDetails.findOne({ where: { userId: user.id } }).then(
                userDetails => {
                  return res.render('account/account', {
                    pageTitle: 'Акаунт',
                    index: false,
                    accountLogin: false,
                    accountDetails: false,
                    accountPage: true,
                    errMessage: null,
                    successMessage: 'Успешно променена парола!',
                    dashboard: false,
                    user,
                    userDetails,
                    sports: userDetails.sports
                      ? userDetails.sports.split(',')
                      : 0,
                    calculator: false,
                    food: false,
                    foodDetails: false,
                    foodPersonal: false,
                  });
                }
              );
            });
          });
        } else {
          UserDetails.findOne({ where: { userId: user.id } }).then(
            userDetails => {
              return res.render('account/account', {
                pageTitle: 'Акаунт',
                index: false,
                accountLogin: false,
                accountDetails: false,
                accountPage: true,
                errMessage: 'Текущата ви парола е различна от въведената!',
                successMessage: null,
                dashboard: false,
                user,
                userDetails,
                sports: userDetails.sports ? userDetails.sports.split(',') : 0,
                calculator: false,
                food: false,
                foodDetails: false,
                foodPersonal: false,
              });
            }
          );
        }
      });
    });
  } else {
    User.findOne({ where: { id: req.user.id } })
      .then(user => {
        UserDetails.findOne({ where: { userId: user.id } }).then(
          userDetails => {
            return res.render('account/account', {
              pageTitle: 'Акаунт',
              index: false,
              accountLogin: false,
              accountDetails: false,
              accountPage: true,
              errMessage: 'Моля въведете парола!',
              successMessage: null,
              dashboard: false,
              user,
              userDetails,
              sports: userDetails.sports ? userDetails.sports.split(',') : 0,
              calculator: false,
              food: false,
              foodDetails: false,
              foodPersonal: false,
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};

exports.postAccountLogin = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;

  User.findOne({
    where: {
      email,
    },
  }).then(user => {
    if (!user) {
      res.status(200).render('account/account', {
        pageTitle: 'Акаунт',
        index: false,
        accountLogin: true,
        accountDetails: false,
        accountPage: false,
        errMessage: 'Грешен имейл или парола',
        successMessage: null,
        user: undefined,
        dashboard: false,
        calculator: false,
        food: false,
        foodDetails: false,
        foodPersonal: false,
      });
    } else {
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => res.redirect('/'));
          } else {
            return res.status(200).render('account/account', {
              pageTitle: 'Акаунт',
              index: false,
              accountLogin: true,
              accountDetails: false,
              accountPage: false,
              errMessage: 'Грешен имейл или парола',
              successMessage: null,
              user: undefined,
              dashboard: false,
              calculator: false,
              food: false,
              foodDetails: false,
              foodPersonal: false,
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
};

exports.getReset = (req, res, next) => {
  res.status(200).render('account/request-reset-password', {
    pageTitle: 'Нулиране на паролата',
    index: false,
    accountLogin: false,
    accountDetails: false,
    accountPage: false,
    errMessage: null,
    successMessage: null,
    dashboard: false,
    calculator: false,
    food: false,
    foodDetails: false,
    foodPersonal: false,
  });
};

exports.postReset = (req, res, next) => {
  const { email } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ where: { email } })
      .then(user => {
        if (!user)
          return res.render('account/request-reset-password', {
            pageTitle: 'Нулиране на паролата',
            index: false,
            accountLogin: false,
            accountDetails: false,
            accountPage: false,
            errMessage: 'Имейла, който предоставихте не същестува!',
            successMessage: null,
            dashboard: false,
            calculator: false,
            food: false,
            foodDetails: false,
            foodPersonal: false,
          });
        else {
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user
            .save()
            .then(result => {
              return transporter.sendMail({
                to: email,
                from: 'fthubsup@gmail.com',
                subject: 'Смяна на парола',
                html: `
              <p>Поискахте смяна на парола</p>
              <p>Натиснете <a href="http://localhost:8080/reset-password/${token}">ТУК</a> за да смените паролата си.</p>
              `,
              });
            })
            .then(result => {
              return res.render('account/request-reset-password', {
                pageTitle: 'Нулиране на паролата',
                index: false,
                accountLogin: false,
                accountDetails: false,
                accountPage: false,
                errMessage: null,
                successMessage:
                  'Успешно изпратихте заявка за нова парола. Моля проверете електронната си поща!',
                dashboard: false,
                calculator: false,
                food: false,
                foodDetails: false,
                foodPersonal: false,
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
        return next();
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const { token } = req.params;
  User.findOne({
    where: {
      resetToken: token,
    },
  })
    .then(user => {
      if (!user) {
        return res.render('account/request-reset-password', {
          pageTitle: 'Нулиране на паролата',
          index: false,
          accountLogin: false,
          accountDetails: false,
          accountPage: false,
          errMessage:
            'Сесията ви е изтекла, моля направете нова заявка за смяна на парола',
          successMessage: null,
          dashboard: false,
          calculator: false,
          food: false,
          foodDetails: false,
          foodPersonal: false,
        });
      } else {
        const timestamp = Date.parse(user.resetTokenExpiration.toString());
        const resetTokenExpirationUser = new Date(timestamp);
        const now = new Date(Date.now());

        if (resetTokenExpirationUser > now) {
          return res.render('account/reset-password', {
            pageTitle: 'Нова парола',
            index: false,
            accountLogin: false,
            accountDetails: false,
            accountPage: false,
            errMessage: null,
            successMessage: null,
            userId: user.id,
            passwordToken: token,
            dashboard: false,
            calculator: false,
            food: false,
            foodDetails: false,
            foodPersonal: false,
          });
        } else {
          return res.render('account/request-reset-password', {
            pageTitle: 'Нулиране на паролата',
            index: false,
            accountLogin: false,
            accountDetails: false,
            accountPage: false,
            errMessage:
              'Изтекло време за нулиране на паролата, моля опитайте отново!',
            successMessage: null,
            dashboard: false,
            calculator: false,
            food: false,
            foodDetails: false,
            foodPersonal: false,
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const { newPassword } = req.body;
  const { userId } = req.body;
  const { passwordToken } = req.body;
  let resetUser;

  User.findOne({
    where: {
      resetToken: passwordToken,
      id: userId,
    },
  }).then(user => {
    const timestamp = Date.parse(user.resetTokenExpiration.toString());
    const resetTokenExpirationUser = new Date(timestamp);
    const now = new Date(Date.now());

    if (resetTokenExpirationUser > now) {
      resetUser = user;
      return bcrypt
        .hash(newPassword, 12)
        .then(hashedPassword => {
          resetUser.password = hashedPassword;
          resetUser.resetToken = null;
          resetUser.resetTokenExpiration = null;
          return resetUser.save();
        })
        .then(result => {
          res.render('account/account', {
            path: '/account',
            pageTitle: 'Акаунт',
            index: false,
            accountLogin: true,
            accountDetails: false,
            accountPage: false,
            errMessage: null,
            successMessage: null,
            user: req.user,
            dashboard: false,
            calculator: false,
            food: false,
            foodDetails: false,
            foodPersonal: false,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return res.render('account/request-reset-password', {
        pageTitle: 'Нулиране на паролата',
        index: false,
        accountLogin: false,
        accountDetails: false,
        accountPage: false,
        errMessage:
          'Изтекло време за нулиране на паролата, моля опитайте отново!',
        successMessage: null,
        dashboard: false,
        calculator: false,
        food: false,
        foodDetails: false,
        foodPersonal: false,
      });
    }
  });
};

exports.postAccountLogout = (req, res, next) => {
  req.session.destroy(() => res.redirect('/account'));
};
