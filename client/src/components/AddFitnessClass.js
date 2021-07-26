import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const AddFitnessClass = () => {
    const [ fitnessClass, setFitnessClass ] = useState({
        name: "",
        position: "",
        catchPhrase: "",
        numTreasureChests: 0,
        pegLeg: true,
        eyePatch: true,
        hookHand: true,
        imageUrl: ""
    });

    const [ errors, setErrors ] = useState({});

    const positions = [
        "Captain",
        "First Mate",
        "Quarter Master",
        "Boatswain",
        "Powder Monkey"
    ];
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
    
        axios.post("http://localhost:8000/api/pirates", pirate)
            .then((res) => {
                console.log(res.data);

                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    navigate("/pirate/" + res.data._id);
                }
            })
            .catch((err) => console.log(err));
    }

    const onChangeHandler = (e) => {
        let newPirate = { ...pirate };

        if (["pegLeg", "eyePatch", "hookHand"].includes(e.target.name)) {
            newPirate[e.target.name] = e.target.checked;
        } else {
            newPirate[e.target.name] = e.target.value;
        }

        setPirate(newPirate);
    }

    return (
        <div>
            <div className="Header">
                <div></div>
                <h1>Add Pirate</h1>
                <div>
                    <Link to="/pirates">
                        <button className="NormalButton">Crew Board</button>
                    </Link>
                </div>
            </div>
            <div className="Body">
                <form onSubmit={ (e) => onSubmitHandler(e) }>
                    <div className="AddLeft">
                        <div className="AddRow">
                            <div><label htmlFor="name">Pirate Name:</label></div>
                            <div><input id="name" name="name" type="text" size="25" onChange={ (e) => onChangeHandler(e) }/></div>
                            {
                                errors.name ? <div className="Error">{ errors.name.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <div><label htmlFor="imageUrl">Image URL:</label></div>
                            <div><input id="imageUrl" name="imageUrl" type="text" size="35" onChange={ (e) => onChangeHandler(e) }/></div>
                            {
                                errors.imageUrl ? <div className="Error">{ errors.imageUrl.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <div><label htmlFor="numTreasureChests"># of Treasure Chests:</label></div>
                            <div><input id="numTreasureChests" name="numTreasureChests" type="number" min="0" max="100" value={ pirate.numTreasureChests } onChange={ (e) => onChangeHandler(e) }/></div>
                            {
                                errors.numTreasureChests ? <div className="Error">{ errors.numTreasureChests.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <div><label htmlFor="catchPhrase">Pirate Catch Phrase:</label></div>
                            <div><textarea id="catchPhrase" name="catchPhrase" rows="2" cols="40" onChange={ (e) => onChangeHandler(e) }/></div>
                            {
                                errors.catchPhrase ? <div className="Error">{ errors.catchPhrase.message }</div> : null
                            }
                        </div>
                    </div>
                    <div className="AddRight">
                        <div className="AddRow">
                            <div><label htmlFor="position">Crew Position:</label></div>
                            <div><select id="position" name="position" value={ pirate.position } onChange={ (e) => onChangeHandler(e) }>
                                <option value=""></option>
                                {
                                    positions.map((position) => (
                                        <option key={ position } value={ position }>{ position }</option>
                                    ))
                                }
                            </select></div>
                            {
                                errors.position ? <div className="Error">{ errors.position.message }</div> : null
                            }
                        </div>
                        <div className="AddRow">
                            <div>
                                <input id="pegLeg" name="pegLeg" type="checkbox" checked={ pirate.pegLeg } onChange={ (e) => onChangeHandler(e) }/>
                                <label htmlFor="pegLeg">Peg Leg</label>
                            </div>
                            <div>
                                <input id="eyePatch" name="eyePatch" type="checkbox" checked={ pirate.eyePatch } onChange={ (e) => onChangeHandler(e) }/>
                                <label htmlFor="eyePatch">Eye Patch</label>
                            </div>
                            <div>
                                <input id="hookHand" name="hookHand" type="checkbox" checked={ pirate.hookHand } onChange={ (e) => onChangeHandler(e) }/>
                                <label htmlFor="hookHand">Hook Hand</label>
                            </div>
                        </div>
                        <div className="AddRow">
                            <input className="NormalButton" type="submit" value="Add Pirate"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFitnessClass;