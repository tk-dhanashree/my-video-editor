import React, { forwardRef } from 'react';

// VideoPlayer component for displaying the video
const VideoPlayer = forwardRef(({ src }, ref) => {
  return (
    <video ref={ref} controls className="w-full h-96 rounded-lg shadow-lg">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

export default VideoPlayer;
