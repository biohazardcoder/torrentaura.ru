import React from 'react';

function Sidebar({ categories = [], selectedCategory, setSelectedCategory }) {
    return (
        <div className="bg-sidebarBg text-sidebarText border-sidebarText border-t-[1px] border-r-0 border-b-0 border-l-0 w-72 col-span-1 row-span-10 shadow-md p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2 ">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={index}>
                            <button
                                onClick={() => setSelectedCategory(category)}
                                className={`block w-full text-left p-2 rounded-md transition-colors ${selectedCategory === category
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 hover:bg-gray-300 text-black"
                                    }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No categories available</li>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
