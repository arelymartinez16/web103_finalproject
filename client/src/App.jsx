import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import RoomListingDetailPage from './pages/RoomListingDetailPage'
import Home from './pages/Home'
import './App.css'
import CreateRoomPage from './pages/CreateRoom'
import UpdateRoomPage from './pages/UpdateRoom'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'

function App() {
  const [user, setUser] = useState(null);
  const API_URL = process.env.NODE_ENV === 'production' ? 'https://web103finalproject-production.up.railway.app' : ''

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

  const logout = async () => {
    const url = `${API_URL}/auth/logout`;
    await fetch(url, { credentials: 'include' });
    window.location.href = '/'; 
  };

  // Define routes and protect them based on user authentication
  let element = useRoutes([
    {
    path: '/home',
    element: user && user.user_id?
        <Home user={user} /> : <Login api_url={API_URL} />
    },
    {
      path: '/room/new',
      element: user && user.user_id ? <CreateRoomPage user={user} /> : <Login api_url={API_URL} />
    },
    {
      path: '/room/update/:id',
      element: user && user.user_id ? <UpdateRoomPage user={user} /> : <Login api_url={API_URL} />
    },
    {
      path: '/room/:id',
      element: user && user.user_id ? <RoomListingDetailPage user={user} /> : <Login api_url={API_URL} />
    },
    {
      path: '/login',
      element: <Login api_url={API_URL} />
    },
    {
      path: '/favorites',
      element: user && user.user_id ? <Favorites user={user} /> : <Login api_url={API_URL} />
    },
    {
      path: '/profile/:id',
      element: user && user.user_id ? <Profile user_id={user.user_id} /> : <Login api_url={API_URL} />
    }
  ]);

  return (
    <>
      {/* {!user && <Login />}
      {user && user.user_id && <Home />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/room/:id" element={<RoomListingDetailPage />}></Route>
        <Route path="/room/new" element={<CreateRoomPage />}></Route>
        <Route path="/room/update/:id" element={<UpdateRoomPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes> */}
      {element}
    </>
  )
}

export default App
