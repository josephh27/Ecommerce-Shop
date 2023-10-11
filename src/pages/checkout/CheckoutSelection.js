import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutSelection.module.scss';


const CheckoutSelection = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className={`container ${styles.selection}`}>
        <h2>How do you wish to checkout?</h2>
        <div className={`${styles.buttons}`}>          
          <button className={`${styles.button} --btn --btn-primary ${styles.stripe}`} onClick={() => navigate('/checkout-stripe')}>
            STRIPE            
          </button>
          <button className={`${styles.button} --btn --btn-primary ${styles.paymongo}`}  onClick={() => navigate('/checkout-paymongo')}>
            PAYMONGO            
          </button>        
        </div>       
      </div>
    </section>
  )
}

export default CheckoutSelection