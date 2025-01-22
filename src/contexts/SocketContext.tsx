import React, { createContext, useEffect, useState } from 'react'
import { socket } from '../socket.ts';
import hitSound from '../assets/hs.mp3'

export interface IMessage { message: string }

type IPlayersActiveInRoom = {
    nick: string;
    points: number
}

type IGameState = {
    targetPosition: {
        x: number,
        y: number
    }
}

const socketContext = createContext<{
    messages: IMessage[],
    rooms: string[],
    isConnected: boolean,
    activeRoom: string;
    playersActiveInRoom: IPlayersActiveInRoom[],
    nickname: string;
    game: IGameState,
    sendMessage: (message: string) => void,
    createRoom: (roomId: string) => void,
    enterRoom: (roomId: string) => void,
    setNickname: (nickName: string) => void,
    updateNickname: (nickName: string) => void,
    actionPlay: (rect: { x: number, y: number }) => void,
}>({
    messages: [],
    isConnected: false,
    activeRoom: '',
    playersActiveInRoom: [],
    nickname: '',
    rooms: [],
    game: { targetPosition: { x: 0, y: 0 } },
    sendMessage: () => { },
    createRoom: () => { },
    enterRoom: () => { },
    setNickname: () => { },
    updateNickname: () => { },
    actionPlay: () => { },
})

function SocketContextProvider({ children }: { children: React.ReactNode }) {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState<IMessage[]>([])
    const [rooms, setRooms] = useState<string[]>([])
    const [roomId, _setRoomId] = useState<string>('global-chat')
    const [activeRoom, setActiveRoom] = useState<string>('')
    const [playersActiveInRoom, setPlayersActiveInRoom] = useState<IPlayersActiveInRoom[]>([])
    const [nickname, setNickname] = useState('')
    const [game, setGame] = useState<IGameState>({ targetPosition: { x: 0, y: 0 } })

    const soundHit = new Audio(hitSound)

    useEffect(() => {

        function onConnect() {
            console.log("conectado com o backend");
            socket.emit("enterRoom", roomId)
            socket.emit("createRoom", roomId)
            setActiveRoom(roomId);
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
            let msgOjb = Object.entries(msg)
            let playersObj: any[] = []
            msgOjb.forEach((obj: any) => {
                playersObj.push(obj[1])
            })
            setPlayersActiveInRoom(playersObj)
        })

        socket.on("gameState", (game) => {
            console.log(game);

            setGame({ targetPosition: { x: game.x, y: game.y } })
        })

        socket.on('updateRooms', (msg) => {
            let msgOjb = Object.entries(msg)
            let rooms: string[] = []
            rooms = msgOjb.map(room => {
                return String(room[0])
            })
            setRooms(rooms)
        })

        socket.on("playMusic", (music) => {
            switch (music) {
                case 'hit':
                    soundHit.currentTime = 0
                    soundHit.volume = 0.02
                    soundHit.play()
                    break;
            }
        })

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('newMessage', () => { });
            socket.off('newUserInRoom', () => { });
            socket.off('gameState', () => { });
            socket.off('updateRooms', () => { });
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
        if (activeRoom === roomId) return;
        setMessages([])
        socket.emit("enterRoom", roomId)
        setActiveRoom(roomId)
    }

    const updateNickname = (nickName: string) => {
        socket.emit('updateNickname', nickName)
        setNickname(nickName)
    }

    const actionPlay = (rect: { x: number, y: number }) => {
        socket.emit("shot", rect)
    }

    return (
        <socketContext.Provider value={{ actionPlay, game, updateNickname, setNickname, nickname, playersActiveInRoom, activeRoom, messages, sendMessage, rooms, createRoom, enterRoom, isConnected }}>
            {children}
        </socketContext.Provider>
    )
}
export { SocketContextProvider, socketContext }
