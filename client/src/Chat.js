import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/v4';

const idUser = uuid();
const socket = io('http://localhost:8081');
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'));

const Chat = () => {
    const [message, updateMessage] = useState('');
    const [messages, updateMessages] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const handleNewMessage = newMessage =>
            updateMessages([...messages, newMessage])
        socket.on('chat.message', handleNewMessage)
        return () => socket.off('chat.message', handleNewMessage)
    }, [messages]);

    const handleFormSubmit = event => {
        event.preventDefault();
        if (message.trim()) {
            socket.emit('chat.message', {
                id: idUser,
                message
            });
            updateMessage('');
        }
    }

    const handleInputChange = event => updateMessage(event.target.value);

    return (
        <main className="container">
            <h2>{name}</h2>
            <input
                onChange={setName}
                placeholder="Name"
                type="text"
                value={name}
            />
            <ul className="list">
                {messages.map((m, index) => (
                    <li
                        className={`list__item list__item--${m.id === idUser ? 'mine' : 'other'}`}
                        key={index}
                    >
                        <span className={`message message--${m.id === idUser ? 'mine' : 'other'}`}>
                            {"user:" + m.message}
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
