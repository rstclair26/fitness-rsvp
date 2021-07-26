import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/users/login", { 
        email: email, 
        password: password,
      },
      { withCredentials: true })
      .then((res) => {
        navigate("/classes");
      })
      .catch(err => {
        console.log(err.response);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <h3>If you're already registered, login below:</h3>
      <p className="error-text">{errorMessage ? errorMessage : ""}</p>
      <form onSubmit={ (e) => login(e) }>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password"
            name="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>
        <div className="center">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;