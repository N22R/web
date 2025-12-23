import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../redux/types";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Некоректний email. Має бути мінімум 2 символи після крапки.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!existingUser) {
      alert("Неправильний email або пароль, або користувач не зареєстрований!");
      return;
    }

    if (!existingUser.id) {
      existingUser = { ...existingUser, id: Date.now() };
      const updatedUsers = users.map((u) =>
        u.email === existingUser.email ? existingUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    localStorage.setItem("userEmail", email);

    dispatch({ type: LOGIN_SUCCESS, payload: existingUser });

    navigate("/");
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти</button>
      </form>
      <p>
        Немає акаунта? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
}