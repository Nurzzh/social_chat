import './Chat.css'
import Neymar from "../NNN.jpg"
import { useEffect, useRef, useState } from 'react';

// function Chat() {
// return (
//     <div className='Chat'>
//         <div className='Chat-header'>
//             <button className='return-btn'>←</button>
//             <h2>Elizabeth Nelson</h2>
//         </div>
//         <div className='main'></div>
//         <div className='send-section'>
//             <input/>
//             <button className='send-btn'>Send</button>
//         </div>
//     </div>
// )}

// export default Chat

const Chat = () => {
    const [ws, setWs] = useState();
    const [writeMessage, setWriteMessage] = useState();
    const [allMessages, setAllMessages] = useState([]);
    const bodyRef = useRef(null)
  
    useEffect(() => {
        const webSocket = new WebSocket('ws://192.168.31.210:8000')
        setWs(webSocket)
    }, [])
  
    useEffect(() => {
       if (ws) {
        ws.onmessage = (message) => {
            bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight)
            setAllMessages(prev => [...prev, message.data])
        }
       }
    }, [ws])
  
    const sendMessage = () => {
        ws.send('Nurzhik: ' + writeMessage)
        setWriteMessage('')
    }
    return (
        <div className='messenger__back'>
            <div className='messenger__header'>
                <img className='messenger__ava' src={Neymar} alt=''/>
                <h5>Name</h5>
            </div>
            <div className='messenger__body' ref={bodyRef}>
                {
                    allMessages.length 
                    ?allMessages.map(text =>
                        <div className='messenger__msg'>
                        <p className='msg__text'>{text}</p>
                    </div>)
                    :null
                }
            </div>
            <div className='messenger__footer'>
                <input value={writeMessage} onChange={e=> setWriteMessage(e.target.value)} className='messenger__input'/>
                <button onClick={sendMessage}>Send</button>
            </div> 
        </div>
    )
}
export default Chat