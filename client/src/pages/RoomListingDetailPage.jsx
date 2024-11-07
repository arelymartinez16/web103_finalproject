import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRoom, deleteRoom } from "../services/RoomsAPI.jsx";
import Card from "../components/Card.jsx";
import "../App.css"
import Header from "../components/Header.jsx";

const RoomListingDetailPage = () => {            
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);

    const handleDelete = async () => {
        try {
          await deleteRoom(id);
          navigate("/");
        } catch (error) {
          console.error("Error deleting room:", error);
        }
    };

    useEffect(() => {
        const fetchRoom = async () => {
            const response = await getRoom(id);
            setRoom(response);
        }

        fetchRoom();
    }, [id]);

    if (!room) {
        return <div>Error loading room details. Please try again later.</div>;
    }

    return (
        <>
            <Header />
            <div className="room-detail">
                <div className="room-detail-header">
                    <img src={room.img_url} alt={room.title} className="room-image" />
                    <Card>
                        <p>Rent: {room.monthlyrent}</p>
                        <p>Available: {room.status ? "Yes" : "No"}</p>
                        <p>Type: {room.type}</p>
                    </Card>
                </div>
                <Card title="Description">
                    <p>{room.description}</p>
                </Card>
                <Card title="Amenities">
                    <ul>
                        <li>{room.amenities}</li>
                    </ul>
                </Card>
                <Card title="Contact Information">
                    <p>Placeholder</p>
                </Card>
                <div className="flex justify-between mt-4">
                    <Link to={`/room/update/${id}`} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600">
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600"
                    >
                    Delete
                    </button>
                </div>
            </div>
        </>    
    )
};

export default RoomListingDetailPage;