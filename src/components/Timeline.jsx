import React, { useState } from 'react';

const Timeline = ({ tracks, onAddTrack, onEditTrack, onMergeTracks, onExportVideo, videoRef }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleAddTrack = () => {
    const newTrack = {
      id: tracks.length + 1,
      name: `Track ${tracks.length + 1}`,
      duration: 0,
    };
    onAddTrack(newTrack);
  };

  const handleEditTrack = () => {
    if (selectedTrack) {
      const editedTrack = {
        ...selectedTrack,
        duration: selectedTrack.duration + 1,
      };
      onEditTrack(editedTrack);
    }
  };

  const handleMergeTracks = () => {
    let totalDuration = 0;
    tracks.forEach(track => {
      totalDuration += track.duration;
    });
    const mergedTrack = {
      id: 'merged',
      name: 'Merged Track',
      duration: totalDuration,
    };
    onMergeTracks(mergedTrack);
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


  return (
    <div>
      <div className="flex flex-wrap items-center justify-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleAddTrack}>Add Track</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleEditTrack} disabled={!selectedTrack}>Edit Track</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleMergeTracks}>Merge Tracks</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleExportVideo}>Export Video</button>
      </div>
      <div>
        {tracks.map((track, index) => (
          <div key={index} onClick={() => setSelectedTrack(track)}>
            <p>Track {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;