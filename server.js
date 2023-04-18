require('dotenv').config()
// This is your test secret API key.
const stripe = require('stripe')(process.env.API_SECRET);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
  const userId = await req.body.userId;
  const session = await stripe.checkout.sessions.create({
    // With metadata we can input custom information like user id.
    metadata: {
      userId: userId,
    },
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: process.env.PRICE_ID,
        quantity: 1,
      }
    ],
    mode: 'payment', // only payment (the product must have this configuration on Stripe platform).
    // mode: 'subscription', // for recurrent payment (the product must have this configuration on Stripe platform).
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));