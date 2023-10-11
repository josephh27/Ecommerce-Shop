require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Welcome to eShop website.");
}) 

const array = [];

const calculateOrderAmount = (items) => {
    items.map((item) => {
    const {price, cartQuantity} = item; 
    const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
    });
    const totalAmount = array.reduce((a, b) => {
        return a + b;
    }, 0);

    return totalAmount * 100;
};

app.post("/create-payment-intent-stripe", async (req, res) => {
  const { items, shipping, description, userEmail } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "php",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
        address: {
            line1: shipping.line1,
            line2: shipping.line2,
            city: shipping.city,
            country: shipping.country,
            postal_code: shipping.postal_code,
        },
        name: shipping.name,
        phone: shipping.phone,
    },
    receipt_email: userEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.post("/create-payment-intent-paymongo", async (req, res) => {
    
  const { items } = req.body;
  const filteredItems =  [];
  items.forEach((item) => {
    const newItem = {};
    newItem['currency'] = 'PHP';
    newItem['amount'] = item.price * 100;
    newItem['name'] = item.name;
    newItem['quantity'] = item.cartQuantity;
    filteredItems.push(newItem);
  })

  const checkoutSession = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'authorization': 'Basic c2tfdGVzdF84ZmRZaFhnOVhjM05kcHhmZVpxVmNKZng6',
    },
    body: JSON.stringify({
      "data":{
        "attributes":{
          "send_email_receipt":false,
          "show_description":true,
          "show_line_items":true,
          "description":"This is the description",
          "line_items": filteredItems,
          "payment_method_types":["billease","gcash","card","dob","dob_ubp","grab_pay","paymaya"]
          }
        }
    })
  })

  const checkoutSessionJSON = await checkoutSession.json();
  res.send({"redirect_url": checkoutSessionJSON.data.attributes.checkout_url})
});




const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));