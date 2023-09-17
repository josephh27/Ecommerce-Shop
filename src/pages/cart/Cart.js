import React, { useEffect } from 'react'
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { CALCULATE_TOTAL_QUANTITY, CALCULATE_SUBTOTAL, REMOVE_FROM_CART, ADD_TO_CART, DECREASE_CART, CLEAR_CART, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Card from '../../components/card/Card';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();

  const increaseCart = (cartItem) => {
    dispatch(ADD_TO_CART(cartItem));
  };

  const decreaseCart = (cartItem) => {
    dispatch(DECREASE_CART(cartItem));
  };

  const removeFromCart = (cartItem) => {
    dispatch(REMOVE_FROM_CART(cartItem));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };
  
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);
  
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem, index) => {
                const {id, name, price, imageURL, cartQuantity} = cartItem;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img src={imageURL} alt={name} style={{width: "100px"}}/>
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className={styles.count}>
                        <button className="--btn" onClick={() => decreaseCart(cartItem)}>-</button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button className="--btn" onClick={() => increaseCart(cartItem)}>+</button>
                      </div>
                    </td>
                    <td>
                      {(price * cartQuantity).toFixed(2)}
                    </td>
                    <td className={styles.icons}>
                      <FaTrashAlt size={19} color="red" onClick={() => removeFromCart(cartItem)}/>
                    </td>
                  </tr>        
                );
              })}
            </tbody>
          </table>
          <div className={styles.summary}>
            <button className="--btn --btn-danger" onClick={clearCart}>Clear Cart</button>
            <div className={styles.checkout}>
              <div>
                <Link to="/#products">&larr; Continue Shopping</Link>
                <br />
                <Card cardClass={styles.card}>
                  <p><b>{`Cart Item(s): ${cartTotalQuantity}`}</b></p>
                  <div className={styles.text}>
                    <h4>Subtotal: </h4>
                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>Tax and shipping calculated at checkout</p>
                  <button className="--btn --btn-primary --btn-block">Checkout</button>
                </Card>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart