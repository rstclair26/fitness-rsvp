import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (e) => {
        e.preventDefault();
        axios
            .post(
                "/api/users/login",
                {
                    email: email,
                    password: password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                const userName =
                    res.data.userLoggedIn.lastName +
                    ", " +
                    res.data.userLoggedIn.firstName;
                const userRole = res.data.userLoggedIn.role;
                setAuth({ email, password, userName, userRole });
                console.log(`USER INFO: ${userName} (${userRole})`);
                navigate("/classes");
            })
            .catch((err) => {
                console.log(err.response.data.message);

                switch (err.response.status) {
                    case 401:
                        setErrorMessage(err.response.data.message);
                        break;
                    case 403:
                        navigate("/unapproved");
                        break;
                    default:
                        setErrorMessage(err.response.data.message);
                        break;
                }
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <h4>If you're already registered, login below:</h4>
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={(e) => login(e)}>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="center">
                    <input
                        className="NormalButton"
                        type="submit"
                        value="Login"
                    />
                </div>
            </form>
        </div>
    );
};

export default Login;
