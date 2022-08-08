import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = function () {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = async function () {
    setError(null);
    setIsPending(true);

    try {
      // Signs user out
      await projectAuth.signOut();

      // Dispatch a logout action
      dispatch({ type: "LOGOUT" });

      // update the state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        console.log(err.message);
      }
    }
  };

  return { error, isPending, logout };
};
