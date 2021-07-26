import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import FitnessClassDetail from "./FitnessClassDetail";

const FitnessClassList = () => {
    const [ fitnessClasses, setFitnessClasses ] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/classes")
            .then((res) => {
                console.log(res.data);
                setFitnessClasses(res.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate("/");
                }
            });
    }, []);
    
    const postDeleteHandler = (deletedFitnessClassId) => {
        let updatedFitnessClasses = fitnessClasses.filter((fitnessClass) => fitnessClass._id !== deletedFitnessClassId);
        setFitnessClasses(updatedFitnessClasses);
    }

    const logout = () => {
        axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className="Header">
                <div></div>
                <h1>Pirate Crew</h1>
                <div>
                    <Link to="/class/new">
                        <button className="NormalButton">Add Class</button>
                    </Link>
                </div>
                <div>
                    <button className="NormalButton" onClick={ logout() }>Logout</button>
                </div>
            </div>
            <div className="Body" id="CrewBoardBody">
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