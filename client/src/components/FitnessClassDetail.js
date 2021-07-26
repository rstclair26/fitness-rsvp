import React from "react";
import axios from "axios";
import { Link } from "@reach/router";

const FitnessClassDetail = (props) => {
    const { id, postDeleteHandler } = props;
    const [ fitnessClass, setFitnessClass ] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/classes/" + id)
            .then((res) => setFitnessClass(res.data))
            .catch((err) => console.log(err))
    }, [id])

    const onDeleteHandler = (e, id) => {
        e.preventDefault();

        axios.delete("http://localhost:8000/api/classes/" + id)
            .then((res) => {
                console.log(res.data);
                postDeleteHandler(id);
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="CrewBoardDetailContainer">
            <img className="CrewBoardDetailImage" alt="Fitness Class" src={ fitnessClass.imageUrl }/>
            <div className="CrewBoardDetailContents">
                <h2>{ fitnessClass.name }</h2>
                <div className="CrewBoardDetailButtons">
                    <div>
                        <Link to={ "/class/edit/" + id }>
                            <button className="NormalButton">Edit</button>
                        </Link>
                    </div>
                    <div>
                        <button className="DeleteButton" onClick={ (e) => onDeleteHandler(e, id) }>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FitnessClassDetail;