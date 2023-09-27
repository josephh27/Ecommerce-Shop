import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
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
          } catch(error) {
            setIsLoading(false);
            toast.error(error.message);
          }
        };

        getCollection();
      }, [collectionName]);

      return {data, isLoading};
};

export default useFetchCollection;