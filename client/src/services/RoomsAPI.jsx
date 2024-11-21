const API_URL = process.env.NODE_ENV === 'production' ? 'https://web103finalproject-production.up.railway.app' : ''

export const getRooms = async () => {
    const response = await fetch(`${API_URL}/rooms`);
    const data = await response.json();

    return data;
}

export const getRoom = async (id) => {
    const response = await fetch(`${API_URL}/rooms/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    return data;
}

export const createRoom = async (room) => {
    const response = await fetch(`${API_URL}/rooms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    const data = await response.json();

    return data;
}

export const updateRoom = async (id, room) => {
    const response = await fetch(`${API_URL}/rooms/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    const data = await response.json();

    return data;
}

export const deleteRoom = async (id) => {
    const response = await fetch(`${API_URL}/rooms/${id}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    return data;
}