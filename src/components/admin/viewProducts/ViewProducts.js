import { useEffect, useState } from 'react'
import styles from "./ViewProducts.module.scss";
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../firebase/config';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';
import Loader from '../../loader/Loader';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Search from '../../search/Search';
import Pagination from '../../pagination/Pagination';

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

   // Pagination states
   const [currentPage, setCurrentPage] = useState(1);
   const [productsPerPage] = useState(6);
   // Get current products
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); 

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products: data 
    }));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({
      search,
      products
    }))
  }, [dispatch, search, products]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product',
      'Do you wish to delete this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Cancelled");
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom"
      },
    );
  }

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully");

    } catch(error) {
      toast.error(error.message);
    }
  }


  return (
    <> 
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All products</h2>
        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {filteredProducts.length === 0 ? (
          <p>No product found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>            
            {currentProducts.map((product, index) => {
              const {id, name, price, imageURL, category} = product;
              return (
                  <tr key={id}> 
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      <img src={imageURL} alt={name} style={{ width:"100px" }}/>                
                    </td>
                    <td>
                      {name}
                    </td>
                    <td>
                      {category}
                    </td>
                    <td>
                      {`$${price}`}
                    </td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green"/>
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id, imageURL)}/>
                    </td>
                  </tr>
              )
            })}
            </tbody>
          </table>          
        )}
        <Pagination
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  )
}

export default ViewProducts