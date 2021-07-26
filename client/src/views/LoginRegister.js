import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const LoginRegister = () => {
	return (
		<div className="Body">
            <div className="AddLeft">
    			<Login />
            </div>
            <div className="AddRight">
	    		<RegisterUser />
            </div>
		</div>
	)
}

export default LoginRegister;