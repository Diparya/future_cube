// pages/cube.js
import Cube from '@/components/Cube';
import React from 'react';

const CubePage = () => {
  return (
    <div>
      <h1 className='text-5xl font-bold' style={{ textAlign: 'center', margin: '20px 0' }}>Future Cube</h1>
      <Cube />
    </div>
  );
};

export default CubePage;
