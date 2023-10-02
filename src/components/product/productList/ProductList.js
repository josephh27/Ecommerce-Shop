import React, { useEffect, useState } from 'react'
import styles from './ProductList.module.scss';
import { BsFillGridFill } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilteredProducts, selectOrigFilteredProducts } from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';
import { RESET_CURRENT_PAGE, selectCurrentPage } from '../../../redux/slice/paginationSlice';


const ProductList = ({products}) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // Pagination states
  const currentPage = useSelector(selectCurrentPage)
  const [productsPerPage] = useState(6);
  const filteredProducts = useSelector(selectFilteredProducts);
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Redux states
  const origFilteredProducts = useSelector(selectOrigFilteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({
      sort
    }));
    dispatch(
      RESET_CURRENT_PAGE()
    )
  }, [dispatch, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({
      search
    }));
    dispatch(
      RESET_CURRENT_PAGE()
    )
  }, [dispatch, search, origFilteredProducts]);
  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)}/>
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)}/>
          <p>
            <b>{filteredProducts.length}</b>&nbsp;Products found.
          </p>

        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        {/* Sort Product */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
          </select>

        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              )
            })}
          </>
        )}
      </div>
      { filteredProducts.length > 0 &&
        <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
      }
      
    </div>
  )
}

export default ProductList