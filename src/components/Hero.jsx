import React, { useRef, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Adjusted import path for the video
import heroVideo from '../assets/hero video/herovideo.mp4';

const Hero = () => {
  const videoRef = useRef(null);
  // Tracks whether the (non-looping) video has reached its end so the corner button can replay it
  const [hasEnded, setHasEnded] = useState(false);
  // Tracks play/pause state so the control button shows the right icon
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  // On first load, autoplay WITH sound (unmuted). Browsers may block unmuted autoplay until
  // the user interacts — if that happens the video stays paused and the corner Play button
  // (a user gesture) will start it with sound.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    const attempt = v.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        setIsPaused(true);
      });
    }
  }, []);

  // Play/pause toggle for the hero video (replaces the old mute control)
  const togglePlay = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      // If it had finished, restart from the beginning
      if (hasEnded) {
        v.currentTime = 0;
        setHasEnded(false);
      }
      v.muted = false; // keep sound on — this click is a user gesture
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  // Video finished (no loop) — freeze on the last frame; corner button becomes Play/replay
  const handleEnded = () => {
    setHasEnded(true);
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[#d8241c]">
      {/* Background Video - autoplays once with sound (no loop, unmuted) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        onEnded={handleEnded}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 origin-top transition-transform duration-700 md:scale-[1.25] md:translate-x-[10%]"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay factor for optimized readability without completely muddying up the red tones */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent z-10 pointer-events-none" />

      {/* Fixed Left Floating Social Bar (desktop) - mix-blend keeps icons visible over any section */}
      <div className="hidden lg:flex flex-col gap-6 fixed left-6 top-1/2 -translate-y-1/2 z-50 mix-blend-difference">
        <a
          href="https://github.com/kiran-kumars953"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-125"
          aria-label="GitHub"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/kiran-kumar-s953/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-125"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.783 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.337-.024-3.058-1.865-3.058-1.867 0-2.154 1.459-2.154 2.964v5.698h-3v-11h2.881v1.504h.041c.4-.757 1.379-1.556 2.839-1.556 3.036 0 3.598 1.998 3.598 4.599v6.453z" />
          </svg>
        </a>
        <a
          href="mailto:kirankumar953863@gmail.com"
          className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-125"
          aria-label="Email"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </a>
      </div>

      {/* Content Container - UPDATED: Changed items-center to items-start and added responsive top padding (pt-28 / md:pt-[12%]) to lift content below the navbar */}
      <div className="absolute inset-0 z-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-start text-left w-full h-full pt-28 md:pt-[12%]">
        
        {/* Left Side: Text and Buttons - Shifted higher up */}
        <div className="flex flex-col items-start text-left max-w-lg lg:max-w-xl w-full">
          
          {/* Main Heading */}
          <h1
            data-aos="fade-up"
            data-aos-delay="50"
            className="text-white font-black mb-4 tracking-tight leading-[1.05] select-none"
          >
            <span className="block text-lg sm:text-xl md:text-2xl font-semibold text-white/80 mb-2 tracking-normal">
              Hi, I’m
            </span>
            <span className="block whitespace-nowrap text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              {'Kiran Kumar S'}
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a2a] via-white to-[#ff2a2a] bg-[length:200%_auto] animate-shimmer drop-shadow-[0_2px_15px_rgba(255,42,42,0.25)]">
              Software &amp; AI Engineer
            </span>
          </h1>

          {/* Accent underline */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="h-1 w-24 md:w-32 rounded-full bg-gradient-to-r from-[#ff2a2a] to-transparent mb-6"
          />

          {/* Subheading */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white/90 text-sm md:text-base lg:text-lg font-medium mb-8 max-w-sm md:max-w-md leading-relaxed drop-shadow-sm select-none"
          >
            Computer Science Engineer building full-stack applications, enterprise software, and AI-driven solutions with React.js, Java, Node.js, and Python.
          </p>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-row flex-wrap items-center gap-3 w-full"
          >
            {/* Primary Button */}
            <a
              href="#projects"
              className="px-4 py-2 md:px-6 md:py-2 text-xs md:text-base rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              View My Work
            </a>

            {/* Secondary Button - Glassmorphism style */}
            <a
              href="#contact"
              className="px-4 py-2 md:px-6 md:py-2 text-xs md:text-base rounded-full bg-black/40 border border-white text-white font-semibold hover:bg-black/60 transition-all duration-300 backdrop-blur-md"
            >
              Contact Me
            </a>

            {/* Resume Download Button */}
            <a
              href="/Kiran_Kumar_S_Resume.pdf"
              download
              className="px-4 py-2 md:px-6 md:py-2 text-xs md:text-base rounded-full bg-transparent border border-white/50 text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* Right Side: Play/Pause video controller */}
        <div
          data-aos="zoom-in"
          data-aos-delay="600"
          className="mt-12 md:mt-2 flex flex-col items-center justify-center gap-2 cursor-pointer group self-start md:self-auto"
          onClick={togglePlay}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex justify-center items-center group-hover:scale-105 group-hover:bg-white group-hover:border-white transition-all duration-300 shadow-xl">
            {isPaused ? (
              // Play Icon
              <svg className="w-5 h-5 md:w-6 md:h-6 ml-0.5 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              // Pause Icon
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            )}
          </div>
          <span className="text-white text-[9px] md:text-[11px] font-extrabold tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity mt-1">
            {isPaused ? "Play Reel" : "Pause Reel"}
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        data-aos="fade-up"
        data-aos-delay="800"
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="animate-bounce">
          <svg 
            className="w-5 h-5 text-white opacity-70" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;