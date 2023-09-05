import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import styles from "./auth.module.scss";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';



const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        }
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            setIsLoading(false);
            toast.success("Registration Successful...");
            navigate("/login");
        })
        .catch((error) => {           
            toast.error(error.message);
            setIsLoading(false);
        });
    }

    return (
    <>
        {isLoading && <Loader />}
        <section className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h2>Register</h2>
                    <form onSubmit={registerUser}>
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
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="--btn --btn-primary --btn-block">Register</button>
                        <span className={styles.register}>
                            <p>Already have an account?</p>
                            <Link to="/login">Login</Link>
                        </span>
                    </form>
                </div>
            </Card>
            <div className={styles.img}>
                <img src={registerImg} alt="Register" width="400" />
            </div>
        </section>
    </>
    );
}

export default Register