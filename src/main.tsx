import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SocketContextProvider } from './contexts/SocketContext.tsx'
import ModalProvider from './components/providers/Modal/Modal.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketContextProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </SocketContextProvider>
  </StrictMode>
)
