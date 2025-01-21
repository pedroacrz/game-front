import { useContext, useState } from 'react'
import { socketContext } from '../../contexts/SocketContext'
import './Room.css'

function Rooms() {

    const { rooms, createRoom, enterRoom } = useContext(socketContext)
    const [showCreateRoom, setShowCreateRoom] = useState(false)
    const [roomId, setRoomId] = useState("")

    return (
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

        </div >
    )
}

export default Rooms