import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid'
import './App.css';
import { useRef } from 'react';
function App() {
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  
  useEffect(() => {
    socket.current = io('http://localhost:3000');
    socket.current.on('newMessage', (message) => {
      setMessages([...messages, message]);
    });

    return () => socket.current.off('newMessage');
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.current.emit('newMessage', messageInput);

    setMessageInput('');
  };

  return (
    <>
      <h1>React Chat App</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setMessageInput(e.target.value)} style={{padding: '10px'}} />
        <br />
        <button type='submit'>Send</button>
      </form>
      <div>
        {
          messages?.map((message) => <p key={nanoid()}>{message}</p>)
        }
      </div>
    </>
  );
}

export default App;
