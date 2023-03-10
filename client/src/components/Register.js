import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "../api/axios";

const Register = (props) => {
    // const [confirmReg, setConfirmReg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        isApproved: true,
        password: "",
        confirmPassword: "",
    });

    const roles = ["Administrator", "Instructor", "Student"];

    const handleChange = (e) => {
        // setConfirmReg("");
        const userIsApproved =
            e.target.name === "role"
                ? e.target.value === "Instructor"
                    ? false
                    : true
                : user.isApproved;

        setUser({
            ...user,
            [e.target.name]: e.target.value,
            isApproved: userIsApproved,
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios
            .post("/api/users/register", user, { withCredentials: true })
            .then((res) => {
                // If user is approved, they are logged in. Otherwise, they must wait for approval.
                if (res.status === 200) {
                    console.log(
                        `USER INFO: ${res.data.userLoggedIn.lastName}, ${res.data.userLoggedIn.firstName} (${res.data.userLoggedIn.role})`
                    );
                    navigate("/classes");
                } else {
                    navigate("/unapproved");
                }
            })
            .catch((err) => {
                if (!err?.response) {
                    setErrorMsg(
                        "Registration failed - no response from server"
                    );
                } else if (err.response?.data?.errors) {
                    setErrorMsg("Registration failed - see errors above");
                    setFieldErrors(err.response.data.errors);
                } else {
                    setErrorMsg(
                        `Registration failed - ${err.response.data.message}`
                    );
                }
            });
    };

    return (
        <div>
            <h2>Register</h2>
            <h4>If you're new here, create your account below:</h4>
            <form onSubmit={register}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    {fieldErrors.firstName ? (
                        <span className="error-text">
                            {fieldErrors.firstName.message}
                        </span>
                    ) : null}
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    {fieldErrors.lastName ? (
                        <span className="error-text">
                            {fieldErrors.lastName.message}
                        </span>
                    ) : null}
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    {fieldErrors.email ? (
                        <span className="error-text">
                            {fieldErrors.email.message}
                        </span>
                    ) : null}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    {fieldErrors.role ? (
                        <span className="error-text">
                            {fieldErrors.role.message}
                        </span>
                    ) : null}
                    <select
                        id="role"
                        name="role"
                        value={user.role}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value=""></option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    {fieldErrors.password ? (
                        <span className="error-text">
                            {fieldErrors.password.message}
                        </span>
                    ) : null}
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    {fieldErrors.confirmPassword ? (
                        <span className="error-text">
                            {fieldErrors.confirmPassword.message}
                        </span>
                    ) : null}
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="center">
                    <input
                        className="NormalButton"
                        type="submit"
                        value="Create Account"
                    />
                </div>
            </form>
            {errorMsg ? <h4 style={{ color: "red" }}>{errorMsg}</h4> : null}
        </div>
    );
};

export default Register;
