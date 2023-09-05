import { useState } from 'react';
import { Link } from 'react-router-dom';
import resetImg from "../../assets/reset.png";
import styles from "./auth.module.scss";
import Card from '../../components/card/Card';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setIsLoading(false);
      toast.success("Check email for password reset confirmation");
    })
    .catch((error) => {
      setIsLoading(false);
      toast.error(error.message);
    });
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
          <img src={resetImg} alt="Reset Password" width="400" />
      </div>
      <Card>
          <div className={styles.form}>
              <h2>Reset Password</h2>
              <form onSubmit={resetPassword}>
                  <input type="text"
                    placeholder="Email" value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                  <button className="--btn --btn-primary --btn-block">
                    Reset Password
                  </button>
                  <div className={styles.links}>
                    <p>
                      <Link to="/login">
                          - Login
                      </Link>
                    </p>         
                    <p>
                      <Link to="/register">
                          - Register
                      </Link>
                    </p>            
                  </div>                
                </form>
            </div>
        </Card>
    </section>
  </>
  )
}

export default Reset