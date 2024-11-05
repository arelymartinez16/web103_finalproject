import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import RoomListingDetailPage from './pages/RoomListingDetailPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/:id" element={<RoomListingDetailPage />}></Route>
      </Routes>
    </>
  )
}

export default App
