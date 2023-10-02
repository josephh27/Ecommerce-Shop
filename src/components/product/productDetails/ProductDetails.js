import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import Loader from '../../loader/Loader';
import { ADD_TO_CART, DECREASE_CART, CALCULATE_TOTAL_QUANTITY, selectCartItems } from '../../../redux/slice/cartSlice';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import StarsRating from 'react-star-rate';
import Card from '../../card/Card';

const ProductDetails = () => {
  const {id} = useParams(); 
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => {
    return review.productID === id;
  });

  const cart = cartItems.find((cartItem) => {
    return cartItem.id === id;
  });
  const isAddedToCart = cartItems.findIndex((cartItem) => {
    return cartItem.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY(product));
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY(product));
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">
            &larr; Back To Products
          </Link>
        </div>
        {product === null ? (
          <Loader /> 
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />            
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU:</b> {product.id}
                </p>
                <p>
                  <b>Brand:</b> {product.brand}
                </p>
                <div className={styles.count}>
                  {isAddedToCart < 0 ? null : (
                    <>
                      <button className="--btn" onClick={() => decreaseCart(product)}>-</button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button className="--btn" onClick={() => addToCart(product)}>+</button>
                    </>
                  )}                 
                </div>
                <button className="--btn --btn-danger" onClick={() => addToCart(product)}>ADD TO CART</button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews in this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((filteredReview, index) => {
                  const {rate, review, reviewDate, userName} = filteredReview;
                  return (
                    <div className={styles.review} key={index}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {userName}</b>
                      </span>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
};

export default ProductDetails