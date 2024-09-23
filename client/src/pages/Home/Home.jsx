import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import { getProductPending, getProductSuccess, getProductError } from "../../toolkit/GamesSlicer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ClockLoader } from 'react-spinners';
import { BiError } from 'react-icons/bi';
import axios from "axios";

const HomePage = () => {
    const dispatch = useDispatch();
    const { data = [], isPending, isError } = useSelector((state) => state.games);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(getProductPending());
            try {
                const response = await Axios.get("/product");
                dispatch(getProductSuccess(response.data.data));
            } catch (error) {
                dispatch(getProductError(error.message));
            }
        };

        fetchProducts();
    }, [dispatch]);

    const categories = data.length > 0 ? ["All", ...new Set(data.map(game => game.category))] : [];

    const filteredGames = selectedCategory === "All"
        ? data
        : data.filter(game => game.category === selectedCategory);

    if (isPending) {
        return (
            <div className=" space-y-6 col-span-6 row-span-10 text-center overflow-y-auto ">
                <section className="absolute top-0 right-0 h-screen w-screen bg-sidebarBg ">
                    <div className="container flex flex-col h-full items-center justify-center gap-3">
                        <ClockLoader color="#ffffff" size={50} />
                        <h1 className='text-xl text-white'>Loading...</h1>
                    </div>
                </section>

            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex col-span-6 row-span-10 flex-col items-center justify-center ">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-lg">
                    <div className="flex items-center space-x-2">
                        <BiError size={30} className="text-red-500" />
                        <h2 className="font-bold text-lg">Error</h2>
                    </div>
                    <p className="mt-2 text-sm">{isError}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition duration-300"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex col-span-5 row-span-10">
            <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <div className="p-4 col-span-5 row-span-10 overflow-y-auto">
                <h1 className="text-xl mb-6 flex gap-2">
                    <span className="border-l-4 border-green-500"></span> {selectedCategory} Games
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {filteredGames.length > 0 ? (
                        filteredGames.map((game) => (
                            <div key={game._id} className="bg-white rounded-md p-4 max-w-xs mx-auto">
                                <a href={`/game/${game._id}`} className="text-center">
                                    <img
                                        src={game.photos[1]}
                                        alt={game.title}
                                        className="w-[200px] h-[250px] object-cover mb-2 rounded-md"
                                    />
                                    <h2 className="text-sm font-semibold">{game.title}</h2>
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No games available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
