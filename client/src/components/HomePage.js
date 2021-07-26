import { Link } from "@reach/router";

const HomePage = () => {
    return (
        <div>
            <div className="Header">
                <div></div>
                <h1>Fitness RSVP</h1>
                <div>
                    <img src="../images/group_class.jpg" alt="Group class" width="50%"/>
                </div>
                <h3>Welcome to Fitness RSVP - your studio class scheduler!</h3>
                <h3>Please login/register to continue.</h3>
                <div>
                    <Link to="/login">
                        <button className="NormalButton">Login / Register</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage;