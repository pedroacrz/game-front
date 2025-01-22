import React, { createContext, useEffect, useState } from 'react'
import { socket } from '../socket.ts';

export interface IMessage { message: string }

type IPlayersActiveInRoom = {
    nick: string;
    points: number
}

const socketContext = createContext<{
    messages: IMessage[],
    sendMessage: (message: string) => void,
    createRoom: (roomId: string) => void,
    enterRoom: (roomId: string) => void,
    rooms: string[],
    isConnected: boolean,
    activeRoom: string;
    playersActiveInRoom: IPlayersActiveInRoom[],
    nickname: string;
}>({
    messages: [],
    sendMessage: Function,
    rooms: [],
    createRoom: Function,
    enterRoom: Function,
    isConnected: false,
    activeRoom: '',
    playersActiveInRoom: [],
    nickname: ''
})

function SocketContextProvider({ children }: { children: React.ReactNode }) {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState<IMessage[]>([])
    const [rooms, setRooms] = useState<string[]>([])
    const [roomId, _setRoomId] = useState<string>('global-chat')
    const [activeRoom, setActiveRoom] = useState<string>('')
    const [playersActiveInRoom, setPlayersActiveInRoom] = useState<IPlayersActiveInRoom[]>([])
    const [nickname, setNickname] = useState('')
    useEffect(() => {
        function onConnect() {
            console.log("conectado com o backend");
            socket.emit("enterRoom", roomId)
            socket.emit("createRoom", roomId)
            setActiveRoom(roomId)
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
        socket.on("updatePlayers", msg => {
            //console.log(msg)
            let msgOjb = Object.entries(msg)
            // console.log(msgOjb);
            let playersObj: any[] = []
            msgOjb.forEach((obj: any) => {
                console.log(obj);
                playersObj.push(obj[1])
            })
            console.log(playersObj);
            setPlayersActiveInRoom(playersObj)

            // let players: IPlayersActiveInRoom[] = []
            // players = msgOjb.map((player: IPlayersActiveInRoom, i: number) => {
            //     return { nick: player.nick, points: player.points }
            // })
            // setPlayersActiveInRoom(players)
        })

        socket.on('updateRooms', (msg) => {
            let msgOjb = Object.entries(msg)
            let rooms: string[] = []
            rooms = msgOjb.map(room => {
                return String(room[0])
            })
            setRooms(rooms)
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
        setMessages([])
        socket.emit("enterRoom", roomId)
        setActiveRoom(roomId)
    }

    return (
        <socketContext.Provider value={{ nickname, playersActiveInRoom, activeRoom, messages, sendMessage, rooms, createRoom, enterRoom, isConnected }}>
            {children}
        </socketContext.Provider>
    )
}
export { SocketContextProvider, socketContext }
