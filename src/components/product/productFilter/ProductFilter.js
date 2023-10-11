import React, { useEffect, useState } from 'react';
import styles from "./ProductFilter.module.scss";
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_ITEMS, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import { RESET_CURRENT_PAGE } from '../../../redux/slice/paginationSlice';

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(1499);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();
  console.log(maxPrice);
  useEffect(() => {
    dispatch(FILTER_ITEMS({products, category, brand, price}));    
    dispatch(RESET_CURRENT_PAGE());
  }, [products, category, brand, price, dispatch]);

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand))
  ];

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  }

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button key={index} type="button"                                         
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => setCategory(cat)} 
            >                               
              &#8250; {cat}
            </button>
          )
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option value={brand} key={index}>{brand}</option>
            )
          })}        
        </select>
        <h4>Price</h4>
        <p>{`₱${price}`}</p>
        <div className={styles.price}>
          <input 
            type="range" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}  
            min={minPrice} 
            max={maxPrice}  
          />                 
        </div>
        <br />
        <button className="--btn --btn-danger" onClick={clearFilters}>Clear Filter</button>
      </div>
    </div>
  )
}

export default ProductFilter