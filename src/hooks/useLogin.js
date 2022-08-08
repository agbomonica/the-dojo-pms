import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = function () {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async function (email, password) {
    setIsPending(true);
    setError(null);

    try {
      // Sign in user
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      console.log(response);
      if (!response) throw new Error("Incorrect Credentials");

      // update global state
      dispatch({ type: "LOGIN", payload: response.user });

      // update local state
      setIsPending(false);
      setError(null);
    } catch (err) {
      setIsPending(false);
      setError(err.message);
      console.log(err.message);
    }
  };

  return { isPending, error, login };
};
