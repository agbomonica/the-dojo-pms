// ADD, DELETE, UPDATE DOCUMENT

import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = function (state, action) {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "DELETED_DOCUMENT":
      return { document: null, isPending: false, error: null, success: true };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = function (collection) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // firestore ref
  const ref = projectFirestore.collection(collection);

  // // dispatch if component is mounted
  // const dispatchIfNotCancelled = function (action) {
  //   if (!isCancelled) dispatch(action);
  // };

  // add document
  const addDocument = async function (doc) {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
      console.log(err.message);
    }
  };

  // delete document
  const deleteDocument = async function (id) {
    dispatch({ type: "IS_PENDING" });

    try {
      const response = await ref.doc(id).delete();
      dispatch({ type: "DELETED_DOCUMENT", payload: response });
    } catch (err) {
      dispatch({ type: "ERROR" });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  });

  return { addDocument, deleteDocument, response };
};
