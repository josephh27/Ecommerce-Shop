import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCollection = () => {
        setIsLoading(true);
        try {
          const docRef = collection(db, collectionName);
          const q = query(docRef);
          
          onSnapshot(q, (snapshot) => {  
            const allData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            if (collectionName === "products") {
              setData(allData.sort((a, b) => {
                return a['name'].toLowerCase().localeCompare(b['name'].toLowerCase());
              }));
            } else {
              setData(allData);
            }
            
            setIsLoading(false);            
          });
          console.log(data);
        } catch(error) {
          setIsLoading(false);
          toast.error(error.message);
        }
      };

      useEffect(() => {
        getCollection();
      }, []);

      return {data, isLoading};
};

export default useFetchCollection;