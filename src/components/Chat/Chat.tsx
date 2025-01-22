import './Chat.css'
import { socketContext } from '../../contexts/SocketContext'
import { useContext, useEffect, useRef, useState } from 'react'

function Chat() {

    const { messages, sendMessage, activeRoom } = useContext(socketContext)
    const [messageInInput, setMessageInInput] = useState<string>('')
    const messagesDiv = useRef<HTMLDivElement>(null)

    async function sendMessageFunction() {
        sendMessage(messageInInput);
        setMessageInInput('');
    }

    useEffect(() => {
        messagesDiv.current?.scrollTo(0, messagesDiv.current?.scrollHeight)
    }, [messages])

    return (
        <div className='chat'>
            <h3>Chat <span>({activeRoom})</span></h3>
            <section className='chatSection'>

                <div ref={messagesDiv} id="messages" className='messages'>
                    <ul >
                        {messages && messages.map((message, i) => {
                            return <li key={i}>{message.message}</li>
                        })}
                    </ul>
                </div>

                <div className='inputAndButton'>
                    <input
                        value={messageInInput}
                        onChange={e => setMessageInInput(e.target.value)}
                        type="text"
                        id="inputMessage"
                        placeholder='Escreva aqui...'
                        className='inputMessage'
                        onKeyDown={(e) => {
                            console.log(e.key);
                            if (e.key === 'Enter') {
                                sendMessageFunction()
                            }
                        }} />
                </div>

            </section>
        </div>
    )
}

export default Chat