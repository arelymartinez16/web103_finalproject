import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import RoomCard from "../components/RoomCard.jsx";
import { getRooms } from "../services/RoomsAPI.jsx";

const Home = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
        try {
            const data = await getRooms();
            setRooms(data);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
        };

        fetchRooms();
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <div className="flex flex-wrap justify-center">
                {rooms.map((room) => (
                    <RoomCard key={room.room_id} room={room} />
                ))}
                </div>
            </div>
        </>
    );
}

export default Home;