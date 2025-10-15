"use client";
import React, { useEffect, useState, useRef } from 'react'
import AskAQuestion from '../Ask/Ask'

export default function VideoPlayer() {
    
    const [isSticky, setIsSticky] = useState(false);
    const [videoHeight, setVideoHeight] = useState(0);
    const [hasVideoPlayed, setHasVideoPlayed] = useState(false);
    const videoRef = useRef<HTMLDivElement>(null);
    const videoElementRef = useRef<HTMLVideoElement>(null);
    
    
    useEffect(() => {
        const handleScroll = () => {
            // Only make sticky if video has been played at least once
            if (hasVideoPlayed) {
                setIsSticky(window.scrollY > 100);
            } else {
                setIsSticky(false);
            }
        };

        const handleResize = () => {
            if (videoRef.current) {
                setVideoHeight(videoRef.current.offsetHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // Set initial height
        if (videoRef.current) {
            setVideoHeight(videoRef.current.offsetHeight);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [hasVideoPlayed]);

    const handleVideoPlay = () => {
        setHasVideoPlayed(true);
    };

    const handleVideoPause = () => {
        // Don't change hasVideoPlayed state - once played, it stays played
    };

    const handleCloseSticky = () => {
        setIsSticky(false);
        setHasVideoPlayed(false); // Reset so it won't become sticky again until played again
    };

    

  return (
    <>
      {/* Placeholder div to maintain space when video is fixed */}
      {isSticky && <div style={{ height: videoHeight + 30 }} className="md:hidden"></div>}
      
      <div 
        ref={videoRef}
        className={`rounded-lg transition-all duration-500 ease-in-out ${isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-lg md:relative md:shadow-none md:bg-transparent' : ''}`}
      >
        {/* Close button - only visible when fixed */}
        {isSticky && (
          <button
            onClick={handleCloseSticky}
            className="absolute top-2 right-2 z-10 bg-black/10 bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200 md:hidden"
            aria-label="Close sticky video"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        
        <div className={`transition-all duration-500 ease-in-out ${isSticky ? 'w-full md:p-0' : ''}`}>
          <video
            ref={videoElementRef}
            src="/test.mp4"
            controls
            className="w-full object-cover rounded-sm transition-all duration-500 ease-in-out"
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
          ></video>
        </div>
      </div>
    </>
  )
}
