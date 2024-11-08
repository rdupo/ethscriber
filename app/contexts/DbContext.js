import { createContext, useContext, useState, useEffect } from 'react';
import { app, db } from '../../lib/firebase';
import { getDatabase, ref, onValue, get } from 'firebase/database';

const DbContext = createContext();

export const DbProvider = ({ children }) => {
  const [dbData, setDbData] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, 'transactions/');
    
    const fetchData = async () => {
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDbData(Object.values(data));
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data with get():", error);
      }
    };

    // Initial fetch on component mount
    fetchData();

    // Set up a listener for changes
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDbData(Object.values(data));
      } else {
        console.log("No data available");
      }
    });

    // Clean up the listener on component unmount
    return () => {
      off(dbRef, 'value', unsubscribe);
    };
  }, []);

  return (
    <DbContext.Provider value={dbData}>
      {children}
    </DbContext.Provider>
  );
};

export const useDb = () => {
  return useContext(DbContext);
};