import { useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = function () {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async function (email, password, displayName) {
    setError(null);
    setIsPending(true);

    try {
      // Signup
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!response) throw new Error("Could not complete signup");

      // add display name to user profile
      response.user.updateProfile({ displayName });

      // dispatch a login action
      dispatch({ type: "LOGIN", payload: response.user });

      // update the state
      setIsPending(false);
      setError(null);
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };

  return { error, isPending, signup };
};
