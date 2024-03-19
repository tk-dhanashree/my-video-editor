import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSearch } from "react-icons/fa";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        // You can implement search functionality here
    };
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="bg-gray-700 text-white rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 flex-grow"
                    />
                    <button className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        <FaSearch />
                    </button>
                </div>
                <div className="mb-4 flex items-center">
                    <a href="#" className="text-white"><FaUserCircle /></a>
                </div>
            </div>
        </nav>
    );
}

export default Header;
