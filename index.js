const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

//Endpoint1:  Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartValue = newItemPrice + cartTotal;

  res.send('Total cart value is: ' + totalCartValue);
});

//Endpoint 2 : Apply a discount based on membership status

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  let discount = 0;

  if (isMember) {
    discount = 0.1;
  }

  let finalPrice = cartTotal - cartTotal * discount;

  // Return the result as a string
  res.send('Final price after discount is: ' + finalPrice.toFixed(2));
});

//Endpoint 3 : Calculate tax on the cart total

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  const taxRate = 0.05;

  let taxAmount = cartTotal * taxRate;

  res.send('Tax applied on the cart total is: ' + taxAmount.toFixed(2));
});

//Endpoint 4 : Estimate delivery time based on shipping method

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);

  let deliveryDays = 0;

  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    return res.send(
      'Invalid shipping method. Please choose "Standard" or "Express".'
    );
  }

  res.send('Estimated delivery time is: ' + deliveryDays + ' days');
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight); // Parse the weight as a float
  let distance = parseFloat(req.query.distance); // Parse the distance as a float

  // Formula to calculate shipping cost
  let shippingCost = weight * distance * 0.1;

  // Return the result as a string
  res.send('The shipping cost is: ' + shippingCost.toFixed(2));
});

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  let loyaltyPoints = purchaseAmount * 2;

  res.send('Loyalty points earned: ' + loyaltyPoints.toFixed(0));
});

//

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
