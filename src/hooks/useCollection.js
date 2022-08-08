import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

// SUBSCRIBING TO REAL-TIME COLLECTION DATA

export const useCollection = function (collection, _query, _orderBy) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    if (query) ref = ref.where(...query);
    if (orderBy) ref = ref.orderBy(...orderBy);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          return results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (err) => {
        setError("Could not fetch data");
        console.log(err.message);
      }
    );

    // unsubscribe on unmount
    return () => unsub();
  }, [collection, query, orderBy]);

  return { documents, error };
};
