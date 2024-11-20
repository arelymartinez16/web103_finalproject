import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoom, updateRoom } from "../services/RoomsAPI.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header.jsx";

const UpdateRoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    address: "",
    amenities: "",
    leaseTerm: "",
    monthlyRent: "",
    available_date: "",
    type: "",
    location: "",
    status: "",
    img_url: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await getRoom(id);
      setFormData({
        description: response.description,
        address: response.address,
        amenities: response.amenities,
        leaseTerm: response.leaseterm,
        monthlyRent: response.monthlyrent,
        available_date: response.available_date,
        type: response.type,
        location: response.location,
        status: response.status,
        img_url: response.img_url,
      });
    };

    fetchRoom();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedFormData = {
        ...formData,
        monthlyrent: parseFloat(formData.monthlyRent),
    };

    try {
      await updateRoom(id, updatedFormData);
      toast.success("Room updated successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate(`/room/${id}`);
      }, 3000); // Delay navigation to ensure toast shows
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Error updating room", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Update Room</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lease Term</label>
            <input
              type="text"
              name="leaseTerm"
              value={formData.leaseTerm}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Rent</label>
            <input
              type="number"
              name="monthlyRent"
              value={formData.monthlyRent}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Available Date</label>
            <input
              type="date"
              name="available_date"
              value={formData.available_date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amenities</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="img_url"
              value={formData.img_url}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Update Room
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
    
  );
};

export default UpdateRoomPage;