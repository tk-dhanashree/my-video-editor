import React, { useState, useRef } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Timeline from '../components/Timeline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const VideoEditorContainer = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [tracks, setTracks] = useState([]);
  const videoRef = useRef(null);

  const handleUploadVideo = (files) => {
    const file = files[0];
    const videoURL = URL.createObjectURL(file);
    setVideoSrc(videoURL);
  };

  const handleAddTrack = (newTrack) => {
    if (newTrack.type === 'video') {
      setTracks([...tracks, newTrack]);
    } else if (newTrack.type === 'audio') {
      const hasVideoTrack = tracks.some(track => track.type === 'video');
      if (hasVideoTrack) {
        setTracks([...tracks, newTrack]);
      } else {
        alert('Cannot add audio track without a video track.');
      }
    }
  };

  const handleEditTrack = (editedTrack) => {
    if (!editedTrack) {
      alert('No track selected for editing.');
      return;
    }

    const updatedTracks = tracks.map(track =>
      track.id === editedTrack.id ? editedTrack : track
    );

    setTracks(updatedTracks);
  };

  const handleMergeTracks = () => {
    if (tracks.length < 2) {
      alert('Insufficient tracks to merge.');
      return;
    }
    const totalDuration = tracks.reduce((acc, curr) => acc + curr.duration, 0);
    const mergedTrack = {
      id: 'merged',
      name: 'Merged Track',
      duration: totalDuration,
      type: 'video',
    };
    setTracks([mergedTrack]);
  };

  const handleExportVideo = async () => {
    try {
      if (!videoRef.current || !videoRef.current.src) {
        throw new Error('No video source available');
      }
      const mediaRecorder = new MediaRecorder(videoRef.current.captureStream());
      const chunks = [];
      mediaRecorder.ondataavailable = event => {
        chunks.push(event.data);
      };
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'edited_video.mp4';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      };
      mediaRecorder.start();
      videoRef.current.play();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000);
    } catch (error) {
      console.error('Error exporting video:', error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleUploadVideo(event.dataTransfer.files);
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-row" onDragOver={handleDragOver} onDrop={handleDrop}>
      <Sidebar />
      <div className='container mx-auto flex-grow'>
        <Header />
        <div className="grid grid-cols-4 gap-1 p-4">
          <div className="col-span-1 border-4 border-solid border-black flex flex-col items-center justify-between p-4">
            Assets
          </div>
          <div className="col-span-2 border-4 border-solid border-black flex flex-col items-center justify-between p-4">
            <div className="flex flex-col items-center mb-8">
              <input type="file" accept="video/mp4" onChange={(e) => handleUploadVideo(e.target.files)} />
              {videoSrc && <VideoPlayer src={videoSrc} ref={videoRef} className="w-full rounded-lg shadow-lg" />}
            </div>
          </div>
          <div className="col-span-1 border-4 border-solid border-black flex flex-col items-center justify-between p-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleExportVideo}>
              Export Edited Video
            </button>
            <div className="h-full w-full border-t-4 border-solid border-black items-center justify-between p-4">
              Properties
            </div>
          </div>
        </div>
        <div className="w-full max-w-3xl items-center justify-between">
          <Timeline
            tracks={tracks}
            onAddTrack={handleAddTrack}
            onEditTrack={handleEditTrack}
            onMergeTracks={handleMergeTracks}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoEditorContainer;
