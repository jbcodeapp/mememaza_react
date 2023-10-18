import { getAuthCheck } from "@/src/services/auth/slice";
import { useAppDispatch } from "@/src/store";
import { useEffect, useState } from "react";

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();

  const intervalMs = 2000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(getAuthCheck({ token }));
      }
    }, intervalMs);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};
