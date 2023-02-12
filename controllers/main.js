exports.getIndex = (req, res, next) => {
  res.status(200).render('main/index', {
    pageTitle: 'Начало',
    index: true,
    user: req.user,
    accountLogin: false,
    accountDetails: false,
    accountPage: false,
    dashboard: false,
    calculator: false,
    food: false,
    foodDetails: false,
    foodPersonal: false,
  });
};
