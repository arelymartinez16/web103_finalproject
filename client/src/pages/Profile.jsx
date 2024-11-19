import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const Profile = () => {
    const [profileInfo, setProfileInfo] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
    });
    const { id } = useParams();
    const [favorites, setFavorites] = useState([]);
    const API_URL = 'http://localhost:3001';


    useEffect(() => {
        const fetchProfileInfo = async () => {
        try {
            const response = await fetch(`${API_URL}/profile/${id}`);
            const data = await response.json();

            console.log("Profile data:", data);

            setProfileInfo({
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone_number,
                address: data.address,
            });
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }
        };

        fetchProfileInfo();
    }, []);
    // useEffect(() => {
    //     const fetchFavorites = async () => {
    //         try {
    //             const response = await fetch(`${API_URL}/favorites/${user_id}`);
    //             if (response.ok) {
    //                 const json = await response.json();
    //                 setFavorites(json);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching favorites:", error);
    //         }
    //     };

    //     fetchFavorites();
    // }, [user_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo((prevInfo) => ({
          ...prevInfo,
          [name]: value,
        }));
    };
    
    const handleSave = async () => {
        try {
            const userId = parseInt(id, 10); // Ensure user_id is a valid integer
            if (isNaN(userId)) {
                throw new Error("Invalid user ID");
            }
        
            const response = await fetch(`${API_URL}/profile/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileInfo),
            }); 
            const data = await response.json();
        //   setUser(data.user);
            alert("Profile updated successfully!");
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      };

    const logout = async () => {
        const url = `${API_URL}/auth/logout`;
        await fetch(url, { credentials: 'include' });
        window.location.href = '/'; 
    };

    return (
        <>  
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Profile</h1>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">User Information</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                        type="text"
                        name="first_name"
                        value={profileInfo.first_name || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text" 
                            name="last_name"
                            value={profileInfo.last_name || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={profileInfo.phone_number || ""} 
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={profileInfo.address || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
                {/* <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">User Information</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                        type="text"
                        name="first_name"
                        value={profileInfo.first_name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                </div> */}
            </div>
            <h2>Favorites</h2>
            {/* <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.room_id}>{favorite.room_name}</li>
                ))}
            </ul> */}
        </>
    );
}

export default Profile;