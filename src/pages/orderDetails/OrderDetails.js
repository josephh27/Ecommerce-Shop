import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import Loader from '../../components/loader/Loader';
import styles from './OrderDetails.module.scss';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);

  }, [document]);

  console.log(order);
  return (
    <section className={`container ${styles.table}`}>
      <h2>Order Details</h2>
      <div>
        <Link to="/order-history">&larr; Back To Orders</Link>
      </div>
      <br />
      {order === null ? (
        <Loader />
      ) : (
        <>
          <p>
            <b>Order ID:</b> {order.id}            
          </p>
          <p>
            <b>Order Amount:</b> ₱{order.orderAmount}
          </p>
          <p>
            <b>Order Status:</b> {order.orderStatus}
          </p>
          <br />
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cartItem, index) => {
                const {id, name, price, imageURL, cartQuantity} = cartItem;
                return (
                  <tr key={id}>
                    <td>
                      <b>{index +1}</b>
                    </td>
                    <td>
                      <p><b>{name}</b></p>
                      <img src={imageURL} alt={name} style={{ width: "100px" }}/>
                    </td>
                    <td>
                      {price}
                    </td>
                    <td>  
                      {cartQuantity}
                    </td>
                    <td>
                      {(price * cartQuantity).toFixed(2)}
                    </td>
                    <td className={styles.icons}>
                      <Link to={`/review-product/${id}`}>
                        <button className="--btn --btn-primary">
                          Review Product
                        </button>
                      </Link>
                    </td>
                  </tr>
                ) 
              })}
            </tbody>
          </table>
        </>
      )}
    </section>
  )
}

export default OrderDetails