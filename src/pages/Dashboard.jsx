import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineEmergencyRecording } from 'react-icons/md';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
// import Button from './components/Button';

const Dashboard = () => {
  const handleRecordVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Use the stream to record the video or perform other operations
      console.log('Camera stream:', stream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-row">
      <Sidebar />
      <div className='container mx-auto flex-grow'>
        <Header />
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard!</h2>
          <div className='flex py-4 space-x-4'>
            <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              <Link to={`/VideoEditor`} className='text-white flex flex-row justify-between items-center'>
                <MdOutlineAddBox className='text-white text-4xl' /> Create Video
              </Link>
            </div>
            <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleRecordVideo}>
              <div className='text-white flex flex-row justify-between items-center'>
                <MdOutlineEmergencyRecording className='text-white text-4xl' /> Record Video
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Recent Video</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Card 1</h3>
              <p>This is a sample card with some content.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Card 2</h3>
              <p>This is another sample card with some content.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Card 3</h3>
              <p>And here's one more sample card with some content.</p>
            </div>
          </div>
        </div>
        <div>
          {/* <Footer /> */}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
