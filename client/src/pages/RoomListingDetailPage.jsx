import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRoom, deleteRoom } from "../services/RoomsAPI.jsx";
import Card from "../components/Card.jsx";
import Header from "../components/Header.jsx";
import ConfirmationModal from "../components/ConfirmationModal.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const RoomListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isRoomInFavorites, setIsRoomInFavorites] = useState(false);
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, setUser] = useState(null);
  const API_URL = process.env.NODE_ENV === 'production' ? 'https://web103finalproject-production.up.railway.app' : '';

  const handleConfirmDelete = () => {
    setIsModalOpen(true);
  }

  const handleCancelDelete = () => {
      setIsModalOpen(false);
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/auth/login/success`, { credentials: 'include' });
      if (response.ok) {
        const json = await response.json();
        setUser(json.user); 
        console.log('User data:', json.user);
      }
    };

    getUser();
  }, []);

  
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await getRoom(id);
        setRoom(roomData);
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };

    const fetchFavoriteStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/favorites/check/${id}`);
        if (response.ok) {
          const data = await response.json();
          setIsRoomInFavorites(data.isFavorite);
        } else {
          console.error(`Failed to fetch favorite status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    fetchRoomData();
    fetchFavoriteStatus();
  }, [id]);

  const handleToggleFavorite = async () => {
    try {
      const response = await fetch("http://web103finalproject-production.up.railway.app/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id, room_id: parseInt(id) }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsRoomInFavorites((prev) => !prev);
        setMessage(data.message);
      } else {
        console.error(`Failed to toggle favorite: ${response.status}`);
        setMessage("Error toggling favorite.");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setMessage("Error toggling favorite.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRoom(id);
      toast.success("Room deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000)
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Error deleting room", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const renderMessage = () => {
    if (message) {
      return (
        <div className="modal">
          <div className="modal-content">
            <p>{message}</p>
            <button
              onClick={() => setMessage(null)}
              className="bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!room) {
    return <div>Loading room details...</div>;
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
            <p>Location: {room.location}</p>
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
          <Link
            to={`/room/update/${id}`}
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600"
          >
            Edit
          </Link>
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={handleToggleFavorite}
            className={`font-bold text-white py-2 px-4 rounded-md ${
              isRoomInFavorites ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isRoomInFavorites ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={handleCancelDelete} 
        onConfirm={handleDelete} 
      />
      <ToastContainer />
      {renderMessage()}
    </>
  );
};

export default RoomListingDetailPage;