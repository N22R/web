
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../redux/types";

export default function BootstrapAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      dispatch({ type: LOGIN_SUCCESS, payload: existingUser });
    }
  }, [dispatch]);

  return null; 
}