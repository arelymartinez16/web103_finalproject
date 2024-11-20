import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import RoomCard from "../components/RoomCard.jsx";
import { getRooms } from "../services/RoomsAPI.jsx";

const Home = ({ user }) => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [locationFilter, setLocationFilter] = useState("");
    const [maxRentFilter, setMaxRentFilter] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await getRooms();
                setRooms(data);
                setFilteredRooms(data); 
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    const handleFilter = () => {
        const filtered = rooms.filter((room) => {
            const matchesLocation = locationFilter
                ? room.location.toLowerCase().includes(locationFilter.toLowerCase())
                : true;
            const matchesRent = maxRentFilter
                ? room.monthlyrent <= parseInt(maxRentFilter)
                : true;

            return matchesLocation && matchesRent;
        });
        setFilteredRooms(filtered);
    };

    return (
        <>
            <Header user_id={user.user_id} />
            <div className="container mx-auto p-4">
                {/* Filters Section */}
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Filter by location"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="border p-2 rounded w-1/2"
                    />
                    <input
                        type="number"
                        placeholder="Max monthly rent"
                        value={maxRentFilter}
                        onChange={(e) => setMaxRentFilter(e.target.value)}
                        className="border p-2 rounded w-1/2"
                    />
                    <button
                        onClick={handleFilter}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Rooms Display Section */}
                <div className="flex flex-wrap justify-center">
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map((room) => (
                            <RoomCard key={room.room_id} room={room} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-lg mt-4">
                            No rooms found matching your filters.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
