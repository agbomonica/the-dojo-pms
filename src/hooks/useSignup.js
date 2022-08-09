import { useState } from "react";
import {
  projectAuth,
  projectFirestore,
  projectStorage,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = function () {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async function (email, password, displayName, thumbnail) {
    setError(null);
    setIsPending(true);

    try {
      // Signup
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!response) throw new Error("Could not complete signup");

      // upload thumbnail
      const uploadPath = `Thumbnails/${response.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgURL = await img.ref.getDownloadURL();

      // add display name & photoURL to user profile
      await response.user.updateProfile({ displayName, photoURL: imgURL });

      // create a user document
      await projectFirestore
        .collection("users")
        .doc(response.user.uid)
        .set({ online: true, displayName, photoURL: imgURL });

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
