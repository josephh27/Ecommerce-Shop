import React, { useState } from 'react'
import styles from './Pagination.module.scss';

const Pagination = ({currentPage, setCurrentPage, productsPerPage, totalProducts}) => {

    const pageNumbers = [];
    // Limit the page numbers shown
    const [pageNumberList, setPageNumberList] = useState(5);
    const [maxPageNumberList, setMaxPageNumberList] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }


  return (
    <ul className={styles.pagination}>  
        <li>Prev</li>
        
        {pageNumbers.map((number) => {
            return (
                <li key={number}>{number}</li>
            )
        })}

        <li>Next</li>
    </ul>
  )
}

export default Pagination