import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from "./Navbar.module.scss";
import { FaUserCircle } from 'react-icons/fa';
import { selectUsername } from '../../../redux/slice/authSlice';

const Navbar = () => {
  const username = useSelector(selectUsername); 

  const activeLink = ({isActive}) => 
  (isActive ? `${styles.active}` : "")


  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff"/>
        <h4>{username}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar