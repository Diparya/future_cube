// pages/index.js
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1, // Places the video behind other content
        }}
      >
        <source src="/videos/background.mp4" type="video/mp4" /> {/* Replace with your video path */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          textAlign: 'center',
          color: 'white', // Ensure text contrasts with the video
          padding: '50px',
          boxSizing: 'border-box',
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional dark overlay for contrast
        }}
      >
        <h1 className="text-2xl lg:text-6xl font-bold">Welcome to the Future Cube Project</h1>
        <p className="text-sm lg:text-xl mt-2">Explore the cube to see different aspects of a sustainable future.</p>
        <Link href="/cube" className="mt-5">
          <p className="bg-blue-400 p-3 rounded-lg hover:bg-blue-500">Go to Future Cube</p>
        </Link>
      </div>
    </div>
  );
}
