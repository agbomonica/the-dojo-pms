import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = function () {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext() should only be used inside an AuthContextProvider"
    );
  }
  return context;
};
