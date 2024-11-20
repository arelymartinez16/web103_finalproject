import { useState } from "react";
import { createRoom } from "../services/RoomsAPI";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import "../index.css"

const CreateRoomPage = () => {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [leaseTerm, setLeaseTerm] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  // const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const roomData = {
        description,
        address,
        leaseTerm,
        monthlyRent,
        available_date: availableDate,
        location,
        status: "available",
        type,
        amenities,
        img_url: imgUrl,
    };
  
    try {
        await createRoom(roomData);
        toast.success("Room created successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000)
    } catch (error) {
        // Handle error (e.g., show an error message)
        console.error("Error creating room:", error);
        toast.error("Failed to create room. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
        })
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Create a New Room</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location (City, State)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="e.g., San Francisco, CA"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lease Term</label>
            <input
              type="text"
              value={leaseTerm}
              onChange={(e) => setLeaseTerm(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Rent</label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Available Date</label>
            <input
              type="date"
              value={availableDate}
              onChange={(e) => setAvailableDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amenities</label>
            <input
              type="text"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Contact Information</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div> */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateRoomPage;