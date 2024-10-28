// components/VideoPlayer.js
'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const videos = [
  'videos/food_system.mp4',
  'videos/water_supplies.mp4',
  'videos/farm_work.mp4',
  'videos/air_purifier.mp4',
  'videos/waste_resources.mp4',
  'videos/earth.mp4'
];

const VideoPlayer = () => {
  const searchParams = useSearchParams();
  const face = searchParams.get('face');

  useEffect(() => {
    const videoElement = document.getElementById('video');
    if (videoElement) {
      videoElement.play();
    }
  }, [face]);

  if (face === null || face >= videos.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="video-container">
      <video
        id="video"
        src={videos[face]}
        controls
        autoPlay
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
};

export default VideoPlayer;
