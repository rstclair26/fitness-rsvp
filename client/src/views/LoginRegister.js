import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import Register from "../components/Register";

const LoginRegister = () => {
	return (
        <div>
            <Header context="loginRegister" />
            <div className="Body">
                <div className="AddLeft">
                    <Login />
                </div>
                <div className="AddRight">
                    <Register />
                </div>
            </div>
        </div>
	)
}

export default LoginRegister;