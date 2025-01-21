import React, { createContext, useEffect, useState } from 'react'
import { socket } from '../socket.ts';

export interface IMessage { message: string }

const socketContext = createContext<{
    messages: IMessage[],
    sendMessage: (message: string) => void,
    createRoom: (roomId: string) => void,
    enterRoom: (roomId: string) => void,
    rooms: string[]
}>({
    messages: [],
    sendMessage: Function,
    rooms: [],
    createRoom: Function,
    enterRoom: Function
})

function SocketContextProvider({ children }: { children: React.ReactNode }) {

    const [_isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState<IMessage[]>([])
    const [rooms, setRooms] = useState<string[]>([])
    const [roomId, _setRoomId] = useState<string>('global-chat')

    useEffect(() => {
        function onConnect() {
            console.log("conectado com o backend");
            socket.emit("enterRoom", roomId)
            socket.emit("createRoom", roomId)

            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('newMessage', (message) => {
            setMessages((prev) => [...prev, message])
        })
        socket.on("newUserInRoom", (message) => {
            setMessages((prev) => [...prev, message])
        })

        socket.on('updateRooms', (msg) => {
            let msgOjb = Object.entries(msg)
            let rooms: string[] = []
            rooms = msgOjb.map(room => {
                return String(room[0])
            })
            setRooms(rooms)
            console.log(rooms)
        })

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('newMessage', () => { });
            socket.off('newUserInRoom', () => { });
        };
    }, []);

    const sendMessage = (message: string) => {
        socket.emit("sendMessage", message)
    }

    const createRoom = (roomId: String) => {
        if (roomId === "") return;
        socket.emit("createRoom", roomId)
    }

    const enterRoom = (roomId: string) => {
        socket.emit("enterRoom", roomId)
    }

    return (
        <socketContext.Provider value={{ messages, sendMessage, rooms, createRoom, enterRoom }}>
            {children}
        </socketContext.Provider>
    )
}
export { SocketContextProvider, socketContext }
