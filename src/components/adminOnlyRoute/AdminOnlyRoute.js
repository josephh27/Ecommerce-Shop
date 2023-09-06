import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slice/authSlice'
import { Link } from 'react-router-dom';


export const AdminOnlyRoute = ({ children }) => {
    const userEmail = useSelector(selectEmail);
    if (userEmail === "lebronjames23@gmail.com") {
        return children;
    }

    return (
        <section style={{ height: "80"}}>
            <div className="container">
                <h2>Permission Denied.</h2>
                <p>This page can only be viewed by an Admin user.</p>
                <br />
                <Link to="/">
                    <button className="--btn">
                        &larr; Back To Home
                    </button>
                </Link>                
            </div>            
        </section>
    );
}

export const AdminOnlyLink = ({ children }) => {
    const userEmail = useSelector(selectEmail);
    if (userEmail === "lebronjames23@gmail.com") {
        return children;
    }

    return null;
}

