import React, { useEffect, useState } from 'react';
import Axios from '../../Axios';
import { AiFillLike } from 'react-icons/ai';

const Chat = ({ gameId, onLike }) => {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await Axios.get(`/chat/${gameId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSend = async () => {
        if (name.trim() && message.trim() && message.length <= 100) {
            try {
                const response = await Axios.post('/chat', { gameId, name, message });
                setMessages(prev => [response.data, ...prev]);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [gameId]);

    return (
        <div className="bg-sidebarBg border-t border-mainText h-full shadow-md w-full p-4">
            <h2 className="text-xl font-bold mb-4 text-white">Comment</h2>
            <div className="h-96 overflow-y-auto mb-4 p-2 bg-mainText">
                {messages.map((msg) => (
                    <div key={msg._id} className="p-2 mb-2 rounded-lg text-sm bg-gray-200">
                        <div className='flex gap-2'>
                            <img src="https://itorrents-igruha.org/templates/gamestorgreen/dleimages/noavatar.png" alt="logo" className='w-5 h-5 object-cover rounded-sm' />
                            <strong className="text-gray-700">{msg.name}:</strong>
                        </div>
                        <span className='text-black block break-all' style={{ maxWidth: '20ch' }}>
                            {msg.message.length > 100 ? msg.message.substring(0, 100) + '...' : msg.message}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 text-black rounded-lg p-2"
                    placeholder="Your Name"
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-300 text-black rounded-lg p-2"
                    placeholder="Type your message..."
                    maxLength={200}
                />
                <button onClick={handleSend} className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200">
                    Send Message
                </button>
                <button onClick={onLike} className="bg-green-500 flex items-center justify-center text-white rounded-lg py-2 hover:bg-green-600 transition duration-200">
                    <AiFillLike />
                    Like Game
                </button>
            </div>
        </div>
    );
};

export default Chat;
