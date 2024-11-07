import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoom } from "../services/RoomsAPI.jsx";
import Card from "../components/Card.jsx";
import "../App.css"

const RoomListingDetailPage = () => {            
    const { id } = useParams();
    const [room, setRoom] = useState(null);

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
        <div className="room-detail">
            <div className="room-detail-header">
                <img src={room.image} alt={room.title} className="room-image" />
                <Card>
                    <p>Rent: {room.price}</p>
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
        </div>
    )
};

export default RoomListingDetailPage;