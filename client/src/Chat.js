import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';

const idUser = uuid();
const socket = io('http://localhost:8081');
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'));

const Chat = () => {
    const [message, updateMessage] = useState('');
    const [messages, updateMessages] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const handleNewMessage = newMessage => updateMessages([...messages, newMessage]);
        socket.on('chat.message', handleNewMessage);
        return () => socket.off('chat.message', handleNewMessage);
    }, [messages]);

    const handleFormSubmit = event => {
        event.preventDefault();
        if (message.trim()) {
            socket.emit('chat.message', {
                id: idUser,
                message,
                name
            });
            updateMessage('');
        }
    }

    const handleInputChange = event => updateMessage(event.target.value);

    const handleNameChange = event => setName(event.target.value);

    return (
        <main className="container">
            <div>
                <h3><b>Usuario: </b>{name}</h3>
                <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                />

            </div>
            <ul className="list">
                {messages.map((m, index) => (
                    <li
                        className={`list__item list__item--${m.id === idUser ? 'mine' : 'other'}`}
                        key={index}
                    >
                        <span className={`message message--${m.id === idUser ? 'mine' : 'other'}`}>
                            <b>{m.name} : </b>
                            {m.message} { }
                        </span>
                    </li>
                ))}
            </ul>
            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    className="form__field"
                    onChange={handleInputChange}
                    placeholder="Type a new message here"
                    type="text"
                    value={message}
                />
            </form>
        </main>
    )
}

export default Chat;
