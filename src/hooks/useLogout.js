import { useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = function () {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { user, dispatch } = useAuthContext();

  const logout = async function () {
    setError(null);
    setIsPending(true);

    // Sign a user out

    try {
      const { uid } = user;

      // update online status
      await projectFirestore
        .collection("users")
        .doc(uid)
        .update({ online: false });

      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // update the state
      setIsPending(false);
      setError(null);
    } catch (err) {
      setIsPending(false);
      setError(null);
      console.log(err.message);
    }
  };

  return { error, isPending, logout };
};
