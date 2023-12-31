import { useEffect, useState } from 'react'
import styles from "./AddProduct.module.scss";
import Card from '../../card/Card';
import { db, storage } from '../../../firebase/config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import Loader from '../../loader/Loader';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';

const categories = [
  {id: 1, name: "Laptop"},
  {id: 2, name: "Monitor"},
  {id: 3, name: "PC Component"},
  {id: 4, name: "Phone"},
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
}

const AddProduct = () => {
  const {id} = useParams();
  const { data }  = useFetchCollection("products");
  console.log(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState}, productEdit);
    return newState;
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products: data 
    })
  );
  }, [dispatch, data]);

 

  function detectForm(id, f1, f2) {
    console.log(id);
    if (id === "ADD") {
      return f1;
    } else {
      return f2;
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, 
    (error) => {
      toast.error(error.message)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProduct({
          ...product,
          imageURL: downloadURL
        });
        toast.success("Image uploaded successfully.");
      });
    }
);

  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price)  ,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product uploaded successfully.");
      navigate("/admin/all-products");
    } catch(error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      });

      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch(error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      { 
        product && 
        <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product name:</label>
            <input 
              type="text" 
              placeholder="Product name" 
              required 
              name="name" 
              value={product.name} 
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div className={styles["progress-bar"]} style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress < 100  
                      ? `Uploading ${uploadProgress}%` 
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
              </div>
              )}
              
              <input 
                type="file" 
                placeholder="Product Image" 
                accept="image/*" 
                onChange={(e) => handleImageChange(e)}
                // required
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text" 
                  // required 
                  placeholder="Image URL"
                  name="imageURL" 
                  value={product.imageURL} 
                  disabled
                />
              )}
              
            </Card>

            <label>Product Price:</label>
            <input 
              type="number" 
              placeholder="Product price" 
              required 
              name="price" 
              value={product.price} 
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Category:</label>
            <select 
              required 
              name="category" 
              value={product.category} 
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- Choose Product Category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>               
                )
              })}
            </select>

            <label>Product Company/Brand:</label>
            <input 
              type="text" 
              placeholder="Product brand" 
              required 
              name="brand" 
              value={product.brand} 
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Description:</label>
            <textarea 
              name="desc"
              value={product.desc} 
              cols="30" 
              rows="10" 
              required 
              onChange={(e) => handleInputChange(e)}
            > 
            </textarea>

            <button className="--btn --btn-primary">{detectForm(id, "Save Product", "Edit Product")}</button>
          </form>        
        </Card>
        </div>
      }
      
    </>
  )
}

export default AddProduct