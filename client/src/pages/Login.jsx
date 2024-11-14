const Login = (props) => {
    
    const AUTH_URL = `${props.api_url}/auth/github`
     
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4">RoomMateLink 🏠</h1>
                <a href={AUTH_URL}>
                <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                    🔒 Login via Github
                </button>
                </a>
            </div>
        </div>
    )
}

export default Login