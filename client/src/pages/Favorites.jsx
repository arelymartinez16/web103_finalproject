import React, { useState, useEffect } from 'react';
import Header from "../components/Header.jsx";
import RoomCard from "../components/RoomCard.jsx";

const Favorites = ({ title }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    document.title = title || 'Favorites';
  }, [title]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://web103finalproject-production.up.railway.app/favorites', { credentials: 'include' });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center">
          {rooms.length === 0 ? (
            <p className="text-center text-xl font-bold">You have no favorites yet.</p> 
          ) : (
            rooms.map((room) => (
              <RoomCard key={room.room_id} room={room} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
