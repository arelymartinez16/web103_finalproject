import express from 'express'
import cors from 'cors'

import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'

import roomRoutes from './routes/rooms.js'
import userRoomRoutes from './routes/user_rooms.js';
import favoriteRoutes from './routes/favorites.js'
import profileRoutes from './routes/user_profile.js';

import authRoutes from './routes/auth.js'

const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,   // Para proteger la cookie
        secure: process.env.NODE_ENV === 'production', // Solo en producción, usa HTTPS
        maxAge: 24 * 60 * 60 * 1000, // Establece una duración para la sesión, por ejemplo, 24 horas
    },
}));

app.use(express.json())
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://gallant-friendship-production.up.railway.app' : 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ RoomMateLink API</h1>')
})

app.use('/rooms', roomRoutes)
app.use('/auth', authRoutes)
app.use('/users_rooms', userRoomRoutes)
app.use('/favorites', favoriteRoutes)
app.use('/profile', profileRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})