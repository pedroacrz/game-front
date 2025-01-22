import { useContext, useEffect, useState } from 'react'
import { socketContext } from '../../contexts/SocketContext'
import './Room.css'



function Rooms() {



    const { playersActiveInRoom, rooms, createRoom, enterRoom, activeRoom } = useContext(socketContext)
    const [showCreateRoom, setShowCreateRoom] = useState(false)
    const [roomId, setRoomId] = useState("")
    const [tab, setTab] = useState('players')



    function Tab() {
        return (
            <div className='tab'>
                <div onClick={() => { setTab('rooms') }}>Salas</div>
                <div onClick={() => { setTab('players') }}>Jogadores</div>
            </div>
        )
    }

    return (
        <>
            {tab == 'players' ?
                <div className='rooms'>
                    <div className='header'>
                        <h3>Jogadores</h3>
                    </div>
                    <ul className='playersList'>
                        {playersActiveInRoom.map((player, i: number) => {
                            return <li key={i}>
                                <p>{player.nick} : {player.points}</p>
                            </li>
                        })}
                    </ul>
                    <Tab />
                </div >
                :
                <div className='rooms'>
                    <div className='header'>
                        <h3>Salas</h3>
                        <button onClick={() => { setShowCreateRoom(true) }}>Criar sala</button>
                    </div>
                    {showCreateRoom && <div className='createRoom'>
                        <input onChange={e => { setRoomId(e.target.value) }} type="text" placeholder='Digite o nome da sala' />
                        <button onClick={() => { createRoom(roomId); setShowCreateRoom(false) }}>Criar</button>
                    </div>}
                    <ul className='roomsList'>
                        {rooms.map((roomId: string, i: number) => {
                            return <li key={i}>
                                <p>{roomId}</p>
                                <button onClick={() => { enterRoom(roomId); }}>Entrar</button>
                            </li>
                        })}
                    </ul>
                    <Tab />
                </div >


            }
        </>

    )
}

export default Rooms