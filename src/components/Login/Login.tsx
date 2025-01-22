
import { useContext, useState } from 'react';
import { socketContext } from '../../contexts/SocketContext';
import './Login.css'

function Login() {
    const { nickname, updateNickname } = useContext(socketContext)

    const [nick, setNick] = useState('')

    return (
        <div className='login'>
            <h3 className='title'>
                Digite seu nick {nickname}</h3>
            <input
                onKeyDown={(e) => { if (e.key === 'Enter') updateNickname(nick) }}
                type="text"
                onChange={(e) => setNick(e.target.value)}
                className='inputNick'
                placeholder='Digite seu nick' />
            <button onClick={() => {
                if (nick) updateNickname(nick)
            }} className='buttonSendNick'>Entrar</button>
        </div>
    )
}

export default Login