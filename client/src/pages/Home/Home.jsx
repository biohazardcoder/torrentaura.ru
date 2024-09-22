import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import { getProductPending, getProductSuccess, getProductError } from "../../toolkit/GamesSlicer";
import Sidebar from "../../components/Sidebar/Sidebar";

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

    if (isPending) return <p className="text-center text-gray-500">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Error: {isError}</p>;

    return (
        <div className="flex col-span-5 row-span-10">
            <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <div className="p-4 col-span-5 row-span-10 overflow-y-auto">
                <h1 className="text-xl  mb-6 flex   gap-2 "> <span className="border-l-4 border-green-500 "></span>  {selectedCategory} Games</h1>
                <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
                    {filteredGames.length > 0 ? (
                        filteredGames.map((game) => (
                            <div key={game._id} className="bg-white  rounded-md p-4 max-w-xs mx-auto">
                                <a href={`/game/${game._id}`} className="text-center" >
                                    <img
                                        src={game.photos[1]}
                                        alt={game.title}
                                        className="w-[200px] h-[250px] object-cover mb-2 rounded-md"
                                    />
                                    <h2 className="text-sm  font-semibold ">{game.title}</h2>
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
