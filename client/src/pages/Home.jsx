import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import RoomCard from "../components/RoomCard.jsx";
import { getRooms } from "../services/RoomsAPI.jsx";

const Home = ({ user }) => {
    const [rooms, setRooms] = useState([]);
    const API_URL = 'http://localhost:3001';

    useEffect(() => {
        const fetchRooms = async () => {
        try {
            const data = await getRooms();
            setRooms(data);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
        };

        // const getUser = async () => {
        //     const response = await fetch(`${API_URL}/auth/login/success`, { credentials: 'include' });
        //     if (response.ok) {
        //       const json = await response.json();
        //       setUser(json.user); 
        //       console.log('User data:', json.user);
        //     }
        // };

        // getUser();
        fetchRooms();
    }, []);

    const logout = async () => {
        const url = `${API_URL}/auth/logout`;
        await fetch(url, { credentials: 'include' });
        window.location.href = '/'; 
    };

    return (
        <>
            <Header user_id={user.user_id} />
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