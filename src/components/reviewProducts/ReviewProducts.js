import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ReviewProducts.module.scss';
import { selectUserID, selectUsername } from '../../redux/slice/authSlice';
import { useParams } from 'react-router-dom';
import Card from '../card/Card';
import StarsRating from 'react-star-rate';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import useFetchDocument from '../../customHooks/useFetchDocument';
import Loader from '../loader/Loader';

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const {id} = useParams();
  const { document } = useFetchDocument("products", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUsername);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
        userID,
        userName,
        productID: id,
        rate,
        review,
        reviewDate: date,
        createdAt: Timestamp.now().toDate(),
    };

    try {
        addDoc(collection(db, "reviews"), reviewConfig);      
        toast.success("Review Submitted Successfully");
        setRate(0);
        setReview("");
      } catch(error) {
        toast.error(error.message);
      }
  }

  return (
    <section className={`container ${styles.review}`}>
      <h2>Review Products</h2>
      {product === null ? (
        <Loader /> 
      ) : (
        <>
          <p><b>Product Name: </b>{product.name}</p>
          <img src={product.imageURL} alt={product.name} style={{ width: "100px" }} />
          <Card cardClass={styles.card}>
            <form onSubmit={(e) => submitReview(e)}>
              <label>Rating:</label>
              <StarsRating
                value={rate}
                onChange={rate => {
                  setRate(rate);
                }}
              />
              <label>Review:</label>
              <textarea required value={review} onChange={(e) => setReview(e.target.value)} cols="30" rows="10"></textarea>
              <button type="submit" className="--btn --btn-primary">
                Submit Review
              </button>

            </form>
          </Card>
        </>
      )}
      
    </section>
  )
}

export default ReviewProducts