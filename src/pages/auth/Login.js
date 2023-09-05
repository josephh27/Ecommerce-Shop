import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.svg";
import Card from '../../components/card/Card';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setIsLoading(false);
            toast.success("Login Successful...");
            navigate("/");
        })
        .catch((error) => {
            toast.error(error.message);
            setIsLoading(false);
        });
    };

    // Login with Google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
        //   const user = result.user;
          toast.success("Login Successful");
          navigate("/");
        }).catch((error) => {
          // Handle Errors here.
          toast.error(error.message);
        });
    }

    return (
        <>
        {isLoading && <Loader />}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImg} alt="Login" width="400" />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form onSubmit={loginUser}>
                        <input 
                            type="text" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}                             
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
                        <div className={styles.links}>
                            <Link to="/reset">
                                Reset Password
                            </Link>
                        </div>
                        <p>-- or --</p>                    
                    </form>
                    <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}>
                        <FaGoogle color="#fff" />&nbsp;Login With Google
                    </button>
                    <span className={styles.register}>
                        <p>Don't have an account?</p>
                        <Link to="/register">Register</Link>
                    </span>
                </div>
            </Card>
        </section>
        </>
    )
}

export default Login