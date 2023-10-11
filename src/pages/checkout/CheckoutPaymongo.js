import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { selectEmail } from '../../redux/slice/authSlice';
import { selectBillingAddress, selectShippingAddress } from '../../redux/slice/checkoutSlice';

const CheckoutPaymongo = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);

  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);

  const description = `eShop payment: Email: ${customerEmail}, Amount: ${totalAmount}`;

  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? 'http://localhost:4242/create-payment-intent-paymongo' : 'https://ecommerce-shop-api.onrender.com/create-payment-intent-paymongo';

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  useEffect(() => {
    const getUrl = async () => {
      const response = await fetch(
        server, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            items: cartItems,
            userEmail: customerEmail,
            shipping: shippingAddress,
            billing: billingAddress,
            description
          })
        }
      )
      const data = await response.json();
      window.location.href = data.redirect_url
    }

    getUrl();
  }, [cartItems, customerEmail, shippingAddress, billingAddress, description, server])
  return (
    <div>CheckoutPaymongo</div>
  )
}

export default CheckoutPaymongo