const stripe = require('stripe')(
  'sk_test_51MNIOXIzrENprrKEcm2PzbJ18SHcNqpqVKenzNFwvZrDc4Cm5msv28DCbpFGstSYpcRnNFyexWBrL4Y8BQPXOlO800foFj0DDk'
);
const User = require('../models/user');

exports.postCheckoutSession = async (req, res, next) => {
  const { priceId, userId } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: 'http://localhost:8080?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:8080#section-3',

    metadata: {
      user_id: userId,
      price_id: priceId,
    },
  });

  res.redirect(303, session.url);
};

exports.postWebhook = async (req, res, next) => {
  let data;
  let event;
  let eventType;
  // Check if webhook signing is configured.
  const webhookSecret =
    'whsec_606f12f336fc0f3b8037ba2a6502715955bce69f0e7b39e629b3513e22727fd8';
  if (webhookSecret) {
    let signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`);
      console.log(err);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }

  const pay = async function (success = true) {
    if (success) {
      const session = event.data.object;
      const id = session.metadata.user_id;
      if (!id) return;
      const priceId = session.metadata.price_id;
      const user = await User.findOne({ where: { id } });
      let purchasedPlan;
      if (priceId === 'price_1MVeUfIzrENprrKEnWUL63i4') purchasedPlan = 2;
      if (priceId === 'price_1MVeWDIzrENprrKEX5GWXcKO') purchasedPlan = 3;
      await user.update({ paidLevel: purchasedPlan });
    } else {
      const session = event.data.object;
      const id = session.metadata.user_id;
      const user = await User.findOne({ where: { id } });
      await user.update({ paidLevel: 1 });
    }
  };

  switch (eventType) {
    case 'checkout.session.completed':
      pay();
      break;
    case 'invoice.paid':
      pay();
      break;
    case 'invoice.payment_failed':
      pay(false);
      break;
  }

  res.sendStatus(200);
};
