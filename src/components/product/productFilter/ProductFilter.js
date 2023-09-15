import React, { useState } from 'react';
import styles from "./ProductFilter.module.scss";
import { selectProducts } from '../../../redux/slice/productSlice';
import { useSelector } from 'react-redux';

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const [category, setCategory] = useState("All");
  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ]

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button key={index} type="button"                                         
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filerProducts(cat)} 
            >                               
              &#8250; {cat}
            </button>
          )
        })}
        <button>All</button>
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name="brand" id="">
          <option value="all">All</option>
          <option value="all">All</option>
          <option value="all">All</option>
          <option value="all">All</option>
        </select>
        <h4>Price</h4>
        <p>$1500 </p>
        <div className={styles.price}>
          <input type="range" name="price" min="100" max="1000" />          
        </div>
        <br />
        <button className="--btn --btn-danger">Clear Filter</button>
      </div>
    </div>
  )
}

export default ProductFilter