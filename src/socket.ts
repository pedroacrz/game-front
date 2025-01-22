import { io } from 'socket.io-client'

const URL = `${import.meta.env.MODE === 'production' ? 'https://aim-mad.onrender.com/' : 'localhost:3000'}`

export const socket = io(URL)