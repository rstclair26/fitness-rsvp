import React from "react";
import { Link } from "@reach/router";
import homeImage from "../images/group_class.jpg";

const HomePage = () => {
    return (
        <div>
            <div className="Header">
                <div></div>
                <h1>Fitness RSVP</h1>
                <div></div>
            </div>
            <div className="Body" id="HomePageContent">
                <img src={ homeImage } alt="Group class" width="50%"/>
                <h3>Welcome to Fitness RSVP - your studio class scheduler!</h3>
                <h3>Please login/register to continue.</h3>
                <div>
                    <Link to="/login">
                        <button className="BoldActionButton">Login / Register</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage;