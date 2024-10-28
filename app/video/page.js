// pages/video.js
import VideoPlayer from '@/components/VideoPlayer';
import React, { Suspense } from 'react';

export default function VideoPage() {
  return (
    <Suspense fallback={<p>Loading video...</p>}>
      <VideoPlayer />
    </Suspense>
  );
}
