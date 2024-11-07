import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import RoomListingDetailPage from './pages/RoomListingDetailPage'
import Home from './pages/Home'
import './App.css'
import CreateRoomPage from './pages/CreateRoom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/room/:id" element={<RoomListingDetailPage />}></Route>
        <Route path="/room/new" element={<CreateRoomPage />}></Route>
      </Routes>
    </>
  )
}

export default App
