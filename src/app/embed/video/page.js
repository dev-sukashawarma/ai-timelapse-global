'use client';

import { useEffect, useRef } from 'react';

/**
 * Embeddable video page for Shopify product description.
 * URL: /embed/video
 * 
 * This page renders ONLY a fullscreen autoplay muted looping video
 * with zero UI chrome — designed to be loaded inside an <iframe>.
 */
export default function EmbedVideoPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry on first user interaction
          const retry = () => {
            if (video) {
              video.muted = true;
              video.play().catch(() => {});
            }
            window.removeEventListener('click', retry);
            window.removeEventListener('touchstart', retry);
            window.removeEventListener('scroll', retry);
          };
          window.addEventListener('click', retry, { once: true });
          window.addEventListener('touchstart', retry, { once: true });
          window.addEventListener('scroll', retry, { once: true });
        });
      }
    }
  }, []);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#000',
    }}>
      <video
        ref={videoRef}
        src="/video-ai.mp4"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
}
