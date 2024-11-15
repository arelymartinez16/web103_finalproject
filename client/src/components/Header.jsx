import { Link } from "react-router-dom"

const Header = ({ user_id }) => {
    return (
        <div className="header">
            <h1>RoomMateLink</h1>
            <Link to="/"><button className="headerBtn">Explore Rooms</button></Link>
            <Link to="/room/new"><button className="headerBtn"> + Add Room </button></Link>
            <Link to={`/profile/${user_id}`}><button className="headerBtn">Profile</button></Link>
            <Link to="/login"><button className="headerBtn">Log Out</button></Link>
        </div>
    )
}

export default Header;