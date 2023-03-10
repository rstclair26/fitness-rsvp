import React from "react";
import { Link } from "@reach/router";
import Header from "./Header";

const Unapproved = () => {
    return (
        <div>
            <div className="Header">
                <div></div>
                <h1>Fitness RSVP</h1>
                <div>
                    <Link to="/login">
                        <button className="NormalButton">
                            Login / Register
                        </button>
                    </Link>
                </div>
            </div>
            <div className="Body">
                <h3>
                    Your account requires approval from an administrator before
                    you can login to view and manage your classes.
                </h3>
                <h3>Please try to login after you are approved.</h3>
            </div>
        </div>
    );
};

export default Unapproved;
