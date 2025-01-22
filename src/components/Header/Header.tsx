import { useContext } from 'react';
import './Header.css';
import { socketContext } from '../../contexts/SocketContext';

function Header() {
    const { isConnected } = useContext(socketContext)
    return (
        <header>
            <h1>AIM MAD</h1>
            <p>{isConnected ? 'Você está online | ' : 'Você está offline | '} Ping 0</p>
        </header>
    )
}

export default Header