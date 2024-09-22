import React, { useEffect, useState } from 'react';
import Axios from '../../Axios';
import { useParams } from 'react-router-dom';
import { SiUtorrent } from "react-icons/si";
import { FaGamepad, FaHome } from "react-icons/fa";
import Chat from '../../components/Chat/Chat';
import { AiFillLike } from "react-icons/ai";
import { FaFire } from "react-icons/fa";

const GameDetailPage = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await Axios.get(`/product/${id}`);
                setGame(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGame();
    }, [id]);

    const handleLike = async () => {
        try {
            const response = await Axios.post(`/product/${id}/like`);
            setGame(prev => ({ ...prev, like: response.data.like }));
        } catch (error) {
            console.error('Error liking the game:', error);
        }
    };




    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="col-span-6 row-span-10 overflow-y-auto flex">
            <div>
                <Chat gameId={id} onLike={handleLike} />
            </div>
            <div className="p-1 flex flex-col bg-white overflow-auto w-full">
                <div className="p-6 lg:p-8 flex gap-10">
                    <img
                        src={game.photos[1]}
                        alt={game.title}
                        className="w-full lg:w-[300px] lg:h-[400px] object-cover"
                    />
                    <div className="">
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6">
                            {game.title}
                        </h1>
                        <h1 className="text-2xl flex items-center gap-2 font-semibold text-red-600 mb-4">
                            <FaFire /> Likes: {game.like}
                        </h1>
                        <button onClick={handleLike} className="px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                            <AiFillLike />
                            Like
                        </button>
                        <p className="text-gray-700 text-lg mb-1"><strong>Console:</strong> {game.console}</p>
                        <p className="text-gray-700 text-lg mb-1"><strong>Category:</strong> {game.category}</p>
                        <p className="text-gray-700 text-lg mb-1"><strong>Created Year:</strong> {game.created}</p>
                        <p className="text-gray-700 text-lg mb-10"><strong>Company:</strong> {game.company}</p>
                        <p className="text-gray-700 text-lg w-2/3 "><strong>System Requirements:</strong> {game.system}</p>
                    </div>
                </div>
                <p className="p-6 text-gray-800 text-lg mb-6 flex flex-col"><strong className='text-xl'>Description:</strong> {game.description}</p>

                {game.trailer && (
                    <div className="p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">Trailer</h2>
                        <iframe
                            width="100%"
                            height="600"
                            src={game.trailer}
                            title="Game Trailer"
                            frameBorder="0"
                            allowFullScreen
                            className="rounded-lg shadow-lg"
                        ></iframe>
                    </div>
                )}

                {game.photos.length > 2 && (
                    <div className="p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">More Photos</h2>
                        <div className="grid grid-cols-4 gap-4">
                            {game.photos.slice(2).map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt={`Game Photo ${index + 2}`}
                                    className="w-full h-[300px] object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className=" text-hoverBg p-6 space-y-2 mb-6">
                    <h2 className="text-xl font-bold text-black mb-4">Download:</h2>
                    <a href={game.photos[0]} className="w-1/3 flex items-center gap-2 px-6 py-3 bg-gradient-to-t to-[gray] from-black text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.01] duration-300">
                        <span className='text-xl'>< FaGamepad /></span>
                        Download Game
                    </a>

                </div>
                <div className=" text-hoverBg p-6 space-y-2 mb-6">
                    <h2 className="text-xl font-bold text-black mb-4">Download Guide:</h2>

                    <ul className=" pl-5">
                        <li className="flex flex-col ">
                            <h2 className="text-lg font-semibold">1. Register/Login</h2>
                        </li>

                        <li>
                            <h2 className="text-lg font-semibold">2. Download Game</h2>
                        </li>

                        <li>
                            <h2 className="text-lg font-semibold">3. Download µTorrent</h2>
                        </li>

                        <li>
                            <h2 className="text-lg font-semibold">4. Open file via µTorrent</h2>
                        </li>

                        <li>
                            <h2 className="text-lg font-semibold">5. Install in Your Device</h2>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
                    <div className="flex gap-4">
                        <a href="/" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300">
                            <span className='text-xl'><FaHome /></span>
                            Back to Home
                        </a>
                        <a href='https://www.utorrent.com/' target='_blank' className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300">
                            <span className='text-xl'><SiUtorrent /></span>
                            Download µTorrent
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetailPage;
