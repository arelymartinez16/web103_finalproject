import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Header = ({ user_id }) => {
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const getUser = async () => {
    //         const response = await fetch('http://localhost:3001/api/user');
    //         if (response.ok) {
    //             const data = await response.json();
    //             // setUser(data.user);
    //             console.log('User data inside of header component:', data.user);
    //         }
    //     };

    //     getUser();
    // }, []);

    return (
        <div className="header">
            <h1>RoomMateLink</h1>
            <Link to="/"><button className="headerBtn">Explore Rooms</button></Link>
            <Link to="/room/new"><button className="headerBtn"> + Add Room </button></Link>
            <Link to="/favorites"><button className="headerBtn">Favorites</button></Link>
            <Link to={`/profile/${user_id}`}><button className="headerBtn">Profile</button></Link>
            <Link to="/login"><button className="headerBtn">Log Out</button></Link>
        </div>
    )
}

export default Header;