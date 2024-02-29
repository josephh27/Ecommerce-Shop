import React, { useState } from 'react'
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_PAGE, selectCurrentPage } from '../../redux/slice/paginationSlice';

const Pagination = ({ productsPerPage, totalProducts}) => {
    const currentPage = useSelector(selectCurrentPage);
    const pageNumbers = [];
    const totalPages = totalProducts / productsPerPage;
    // Limit the page numbers shown
    const [pageNumberLimit] = useState(10);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(1);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const dispatch = useDispatch();

    // Paginate
    const paginate = (pageNumber) => {
        dispatch(
        SET_CURRENT_PAGE(pageNumber)            
        )
    };

    // Go to the next page
    const paginateNext = () => {
        dispatch(
            SET_CURRENT_PAGE(currentPage + 1)
        )
        // Show next set of page numbers
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };   

    // Go to previous page
    const paginatePrev = () => {
        dispatch(
            SET_CURRENT_PAGE(currentPage - 1)
        )
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };   

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    };


  return (
    <ul className={styles.pagination}>  
        <li onClick={paginatePrev} 
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}>
            Prev
        </li>
        
        {/* {pageNumbers.map((number) => {
             if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {

                return (               
                    <li 
                        key={number} onClick={() => paginate(number)} 
                        className={currentPage === number ? `${styles.active}` : null}
                    >
                        {number}
                    </li>
                );
             }
             return "";
            
        })} */}

        <li onClick={paginateNext} 
        className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : null}>
            Next
        </li>
        <p>
            <b className={styles.page}>{`page ${currentPage}`}</b>
            <span>{` of `}</span>
            <b>{`${Math.ceil(totalPages)}`}</b>
        </p>
    </ul>
  )
}

export default Pagination