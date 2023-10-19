import { authActions } from "@/src/services/auth/slice";
import { useAppDispatch } from "@/src/store";
import { useEffect, useState } from "react";

export const useLocalStorageAuthToken = () => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let t = localStorage.getItem("token");
    let u = localStorage.getItem("userdata");
    if (t && u) {
      setToken(t);
      setUser(u);
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      console.log("Using token and user data from localstorage..");

      dispatch(authActions.setTokenAndUser({ token, user: JSON.parse(user) }));
    }
  }, [user, token]);
};
