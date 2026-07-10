import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to track positioning parameters safely
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Expertise', 'Skills', 'Experience', 'Projects', 'Leadership', 'Certifications', 'Contact'];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isOpen 
          ? 'bg-[#ff2a2a] py-4'
          : isScrolled 
            ? 'bg-white/70 backdrop-blur-xl py-3 border-b border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
            : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Left Side: Dynamic Logo font node configurations */}
        <div className="flex items-center">
          <a 
            href="#" 
            className={`text-2xl font-black tracking-tight transition-colors duration-500 ${
              isOpen || !isScrolled ? 'text-white' : 'text-gray-900'
            }`}
          >
            Kiran <span className="text-[#ff2a2a]">.</span>
          </a>
        </div>

        {/* Center: Desktop Links with dynamic contrasting rules */}
        <div className="hidden md:flex space-x-4 lg:space-x-6">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className={`font-semibold text-sm tracking-wide relative group transition-colors duration-500 ${
                isScrolled ? 'text-gray-600 hover:text-gray-950' : 'text-white/80 hover:text-white'
              }`}
            >
              {link}
              {/* Active animated custom alignment tracking baseline highlight */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ff2a2a] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Side: Responsive CTA Frame Button */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            className={`px-6 py-2.5 rounded-full text-sm font-black transition-all duration-500 ${
              isScrolled
                ? 'bg-gray-900 text-white hover:bg-[#ff2a2a] hover:shadow-[0_10px_25px_rgba(255,42,42,0.25)]'
                : 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black backdrop-blur-md'
            }`}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Trigger Controllers */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none p-2 transition-colors duration-500 ${
              isOpen || !isScrolled ? 'text-white' : 'text-gray-900'
            }`}
            aria-label="Toggle navigation drawer menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel Expansion Drawer Overlay */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[460px] py-6 opacity-100 bg-[#ff2a2a] shadow-2xl' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-black font-extrabold text-base border-b border-white/10 pb-2.5 transition-colors"
            >
              {link}
            </a>
          ))}
          <div className="pt-2">
             <a 
               href="#contact" 
               onClick={() => setIsOpen(false)} 
               className="inline-block px-6 py-3 rounded-full bg-white text-[#ff2a2a] font-black hover:bg-gray-950 hover:text-white transition-all duration-300 w-full text-center shadow-xl"
             >
               Hire Me
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;