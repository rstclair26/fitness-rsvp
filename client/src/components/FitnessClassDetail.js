import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import axios from "../api/axios";

const FitnessClassDetail = (props) => {
    const { id, postDeleteHandler } = props;
    const [ fitnessClass, setFitnessClass ] = useState({});

    useEffect(() => {
        axios.get("/api/classes/" + id, { withCredentials: true })
            .then((res) => setFitnessClass(res.data))
            .catch((err) => console.log(err))
    }, [id])

    const onDeleteHandler = (e, id) => {
        e.preventDefault();

        axios.delete("/api/classes/" + id, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                postDeleteHandler(id);
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="ClassListDetailContainer">
            <img className="ClassListDetailImage" alt="Fitness Class" src={ fitnessClass.imageUrl }/>
            <div className="ClassListDetailContents">
                <h3>{ fitnessClass.name } with { fitnessClass.instructor }</h3>
                <h5>{ fitnessClass.description }</h5>
                <h4>{ fitnessClass.scheduleDays } at { fitnessClass.scheduleTime }{ fitnessClass.scheduleTimeAmPm }</h4>
                <div className="ClassListDetailButtons">
                    <div>
                        <button className="BoldActionButton">Enroll</button>
                    </div>
                    <div>
                        <Link to={ "/class/edit/" + id }>
                            <button className="NormalButton">Change</button>
                        </Link>
                        <button className="DeleteButton" onClick={ (e) => onDeleteHandler(e, id) }>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FitnessClassDetail;