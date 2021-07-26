import React, {useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const PirateDetails = (props) => {
    const [ pirate, setPirate ] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates/" + props.id)
            .then((res) => setPirate(res.data))
            .catch((err) => console.log(err))
    }, [props.id])

    return (
        <div>
            <div className="Header">
                <div></div>
                <h1>{ pirate.name }</h1>
                <div>
                    <Link to="/pirates">
                        <button className="NormalButton">Crew Board</button>
                    </Link>
                </div>
            </div>
            <div className="Body" id="DetailBody">
                <div id="DetailLeft">
                    <img id="DetailImage" alt="Pirate" src={ pirate.imageUrl }/>
                    <h2>"{ pirate.catchPhrase }"</h2>
                </div>
                <div id="DetailRight">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2"><h2>About</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Position:</td>
                                <td>{ pirate.position }</td>
                            </tr>
                            <tr>
                                <td>Treasures:</td>
                                <td>{ pirate.numTreasureChests }</td>
                            </tr>
                            <tr>
                                <td>Peg Leg:</td>
                                <td>{ pirate.pegLeg ? "Yes" : "No" }</td>
                            </tr>
                            <tr>
                                <td>Eye Patch:</td>
                                <td>{ pirate.eyePatch ? "Yes" : "No" }</td>
                            </tr>
                            <tr>
                                <td>Hook Hand:</td>
                                <td>{ pirate.hookHand ? "Yes" : "No" }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PirateDetails;