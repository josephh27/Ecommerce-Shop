import React from 'react';
import { useSelector } from 'react-redux'
import styles from './CheckoutSummary.module.scss';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { Link } from 'react-router-dom';
import Card from '../card/Card';

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    return (
      <div>
        <h3>Checkout Summary</h3>
        <div>
          {cartItems.length === 0 ? (
            <>
              <p>No item in your cart.</p>
              <button className="--btn">
                <Link to="/#products">Back To Shop</Link>
              </button>
            </>
          ) : (
            <div>
              <p>
                <b>{`Cart item(s): ${cartTotalQuantity}`}</b>            
              </p>
              <div className={styles.text}>
                <h4>Subtotal:</h4>
                <h3>₱{cartTotalAmount.toFixed(2)}</h3>
              </div>
              {cartItems.map((cartItem, index) => {
                const {id, name, price, cartQuantity} = cartItem;
                return (
                  <Card cardClass={styles.card} key={id}>
                    <h4>Product: {name}</h4>
                    <p>Quantity: {cartQuantity}</p>
                    <p>Unit Price: {price}</p>
                    <p>Set Price: {price * cartQuantity}</p>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
}

export default CheckoutSummary