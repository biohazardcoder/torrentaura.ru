import React, { useEffect, useState } from "react";
import { ClockLoader } from 'react-spinners';
import { BiError } from 'react-icons/bi';

const Contact = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [isError, setIsError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setIsError(null);
        setSuccess(false);

        const botToken = '8170992530:AAH8wa30a92lfLecXj9SaV4da4KmyzW4_54';
        const chatId = '-1001278075000';
        const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        try {
            const response = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Name: ${name}\nMessage: ${message}`,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to send message: ${errorData.description}`);
            }
            setSuccess(true);
            setMessage("");
            setName("");
        } catch (error) {
            setIsError(error.message);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="col-span-6 row-span-10 text-center overflow-y-auto flex items-center justify-center">
            {isLoading ? (
                <div className="space-y-6 col-span-6 row-span-10 text-center overflow-y-auto">
                    <section className="absolute top-0 right-0 h-screen w-screen bg-sidebarBg">
                        <div className="container flex flex-col h-full items-center justify-center gap-3">
                            <ClockLoader color="#ffffff" size={50} />
                            <h1 className='text-xl text-white'>Loading...</h1>
                        </div>
                    </section>
                </div>
            ) : (
                <div className="flex col-span-6 row-span-10 flex-col items-center justify-center text-center">
                    <div className="bg-white rounded-md shadow-lg p-6 max-w-lg w-full">
                        <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>

                        {isError && (
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-lg">
                                    <div className="flex items-center space-x-2">
                                        <BiError size={30} className="text-red-500" />
                                        <h2 className="font-bold text-lg">Error</h2>
                                    </div>
                                    <p className="mt-2 text-sm">{isError}</p>
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                                <h2 className="font-bold text-lg">Message Sent!</h2>
                                <p>Your message has been sent to Telegram.</p>
                                <h1 className="w-full p-2 bg-yellow-500 mt-5 text-white">
                                    <a href="/" >Back to Home</a>
                                </h1>
                            </div>
                        )}

                        {isSending ? (
                            <div className="flex items-center justify-center mb-4">
                                <ClockLoader color="#000" size={30} />
                                <h1 className='text-lg ml-2'>Sending Message...</h1>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                    rows="4"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
