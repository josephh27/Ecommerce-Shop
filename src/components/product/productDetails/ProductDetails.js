import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { db } from '../../../firebase/config';
import styles from './ProductDetails.module.scss';
import Loader from '../../loader/Loader';
import { toast } from 'react-toastify';
import { ADD_TO_CART, DECREASE_CART, CALCULATE_TOTAL_QUANTITY, selectCartItems } from '../../../redux/slice/cartSlice';

const ProductDetails = () => {
  const {id} = useParams(); 
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cart = cartItems.find((cartItem) => {
    return cartItem.id === id;
  });
  const isAddedToCart = cartItems.findIndex((cartItem) => {
    return cartItem.id === id;
  });

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setProduct(obj);
    } else {  
      toast.error("Product not found");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
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
      </div>
    </section>
  )
};

export default ProductDetails