import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
    return (
        <Link to={`/room/${room.room_id}`}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                <img className="w-full" src={room.img_url} alt={room.type} />
                <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{room.type}</div>
                <p className="text-gray-700 text-base">{room.description}</p>
                </div>
            </div>
        </Link>
    );
  };
  
  export default RoomCard;