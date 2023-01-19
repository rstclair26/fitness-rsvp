import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import axios from "../api/axios";
import FitnessClassDetail from "./FitnessClassDetail";

const FitnessClassList = () => {
    const [ fitnessClasses, setFitnessClasses ] = useState([]);

    useEffect(() => {
        axios.get("/api/classes", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setFitnessClasses(res.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate("/login");
                }
            });
    }, []);
    
    const postDeleteHandler = (deletedFitnessClassId) => {
        let updatedFitnessClasses = fitnessClasses.filter((fitnessClass) => fitnessClass._id !== deletedFitnessClassId);
        setFitnessClasses(updatedFitnessClasses);
    };

    const logout = (e) => {
        e.preventDefault();

        axios.post("/api/users/logout", {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div>
            <div className="Header">
                <div></div>
                <h1>Fitness RSVP</h1>
                <div>
                    <Link to="/class/new">
                        <button className="NormalButton">Add Class</button>
                    </Link>
                </div>
                <div>
                    <button className="NormalButton" onClick={ (e) => logout(e) }>Logout</button>
                </div>
            </div>
            <div className="Body" id="ClassListBody">
                {
                    fitnessClasses.map((fitnessClass, index) => {
                        return (
                            <div key={ index }>
                                <FitnessClassDetail id={ fitnessClass._id } postDeleteHandler={ postDeleteHandler }/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FitnessClassList;