import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const EditFitnessClass = (props) => {
    const { id } = props;
    const [ fitnessClass, setFitnessClass ] = useState({
        name: "",
        description: "",
        imageUrl: "",
        enrollmentAllowed: false,
        instructor: "",
        scheduleDays: "",
        scheduleTime: "",
        scheduleTimeAmPm: ""
    });

    const [ errors, setErrors ] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/classes/" + id)
            .then((res) => setFitnessClass(res.data))
            .catch((err) => console.log(err))
    }, [id])

    const instructors = [
        "Robert S.",
        "Valerie S.",
        "Sarah C.",
        "Daniel G."
];
    
    const days = [
        "Monday/Wednesday/Friday",
        "Tuesday/Thursday",
        "Tuesday/Thursday/Saturday",
        "Saturday/Sunday"
    ];

    const times = [
        "6:00",
        "6:30",
        "7:00",
        "7:30",
        "8:00",
        "8:30",
        "9:00",
    ];

    const ampm = [
        "AM",
        "PM"
    ];

    const onSubmitHandler = (e) => {
        e.preventDefault();
    
        axios.put("http://localhost:8000/api/classes/" + id, fitnessClass)
            .then((res) => {
                console.log(res.data);

                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    navigate("/classes");
                }
            })
            .catch((err) => console.log(err));
    };

    const onChangeHandler = (e) => {
        let updatedFitnessClass = { ...fitnessClass };

        if (["enrollmentAllowed"].includes(e.target.name)) {
            updatedFitnessClass[e.target.name] = e.target.checked;
        } else {
            updatedFitnessClass[e.target.name] = e.target.value;
        }

        setFitnessClass(updatedFitnessClass);
    };

    const logout = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
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
                    <Link to="/classes">
                        <button className="NormalButton">Classes</button>
                    </Link>
                </div>
                <div>
                    <button className="NormalButton" onClick={ (e) => logout(e) }>Logout</button>
                </div>
            </div>
            <div className="Body">
                <form onSubmit={ (e) => onSubmitHandler(e) }>
                    <div className="AddLeft">
                        <div className="AddRow">
                            <div><label htmlFor="name">Name:</label></div>
                            <div><input id="name" name="name" type="text" size="25" onChange={ (e) => onChangeHandler(e) } value={ fitnessClass.name }/></div>
                            {
                                errors.name ? <div className="Error">{ errors.name.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <div><label htmlFor="description">Description:</label></div>
                            <div><textarea id="description" name="description" rows="10" cols="40" onChange={ (e) => onChangeHandler(e) } value={ fitnessClass.description }/></div>
                            {
                                errors.description ? <div className="Error">{ errors.description.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <div><label htmlFor="imageUrl">Picture/Icon URL:</label></div>
                            <div><input id="imageUrl" name="imageUrl" type="text" size="35" onChange={ (e) => onChangeHandler(e) } value={ fitnessClass.imageUrl }/></div>
                            {
                                errors.imageUrl ? <div className="Error">{ errors.imageUrl.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <div>
                                <input id="enrollmentAllowed" name="enrollmentAllowed" type="checkbox" checked={ fitnessClass.enrollmentAllowed } onChange={ (e) => onChangeHandler(e) }/>
                                <label htmlFor="enrollmentAllowed">Allow Enrollment</label>
                            </div>
                        </div>
                    </div>
                    <div className="AddRight">
                        <div className="AddRow">
                            <div><label htmlFor="instructor">Instructor:</label></div>
                            <div><select id="instructor" name="instructor" onChange={ (e) => onChangeHandler(e) }>
                                <option value=""></option>
                                {
                                    instructors.map((instructor) => (
                                        <option key={ instructor } value={ instructor } selected={ fitnessClass.instructor === instructor }>{ instructor }</option>
                                    ))
                                }
                            </select></div>
                            {
                                errors.instructor ? <div className="Error">{ errors.instructor.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <div><label htmlFor="scheduleDays">Schedule Days:</label></div>
                            <div><select id="scheduleDays" name="scheduleDays" onChange={ (e) => onChangeHandler(e) }>
                                <option value=""></option>
                                {
                                    days.map((day) => (
                                        <option key={ day } value={ day } selected={ fitnessClass.scheduleDays === day }>{ day }</option>
                                    ))
                                }
                            </select></div>
                            {
                                errors.scheduleDays ? <div className="Error">{ errors.scheduleDays.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <div><label htmlFor="scheduleTime">Schedule Time:</label></div>
                            <div><select id="scheduleTime" name="scheduleTime" onChange={ (e) => onChangeHandler(e) }>
                                <option value=""></option>
                                {
                                    times.map((time) => (
                                        <option key={ time } value={ time } selected={ fitnessClass.scheduleTime === time }>{ time }</option>
                                    ))
                                }
                            </select></div>
                            <div><select id="scheduleTimeAmPm" name="scheduleTimeAmPm" onChange={ (e) => onChangeHandler(e) }>
                                <option value=""></option>
                                {
                                    ampm.map((designator) => (
                                        <option key={ designator } value={ designator } selected={ fitnessClass.scheduleTimeAmPm === designator }>{ designator }</option>
                                    ))
                                }
                            </select></div>
                            {
                                (errors.scheduleTime || errors.scheduleTimeAmPm) ? <div className="Error">{ errors.scheduleTime.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <input className="NormalButton" type="submit" value="Save Class"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditFitnessClass;