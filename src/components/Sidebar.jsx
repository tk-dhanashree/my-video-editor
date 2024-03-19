import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen w-1/5 p-6 top-0 flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-8">Video Editor</h2>
                <ul>
                    <li className="mb-4">
                        <Link to="/" className="block hover:text-gray-300">New Video</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/" className="block hover:text-gray-300">Home</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/" className="block hover:text-gray-300">Template</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/" className="block hover:text-gray-300">All Videos</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
