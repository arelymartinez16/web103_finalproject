import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <h1>RoomMateLink</h1>
            <Link to="/"><button className="headerBtn">Explore Rooms</button></Link>
            <Link to="/room/new"><button className="headerBtn"> + Add Room </button></Link>
        </div>
    )
}

export default Header;