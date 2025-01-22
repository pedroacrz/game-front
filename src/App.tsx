import './App.css'
import Header from './components/Header/Header'
import Game from './components/Game/Game'

import Chat from './components/Chat/Chat';
import Rooms from './components/Rooms/Rooms';

function App() {


  return (
    <>
      <Header />
      <main>
        <Game />
        <aside>
          <Chat />
          <Rooms />
        </aside>
      </main>


    </>
  )
}

export default App
