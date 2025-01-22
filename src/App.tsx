import './App.css'
import Header from './components/Header/Header'
import Game from './components/Game/Game'

import Chat from './components/Chat/Chat';
import Rooms from './components/Rooms/Rooms';
import { useContext } from 'react';
import { socketContext } from './contexts/SocketContext';
import Login from './components/Login/Login';

function App() {
  const { nickname } = useContext(socketContext)


  return (
    <>
      <Header />
      <main>
        {
          nickname ?
            <><Game />
              <aside>
                <Chat />
                <Rooms />
              </aside>
            </> :
            <Login />
        }
      </main>
    </>
  )
}

export default App
