import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const LoginRegister = () => {
	return (
        <div>
            <div className="Header">
                <div></div>
                <h1>Fitness RSVP</h1>
                <div></div>
            </div>
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