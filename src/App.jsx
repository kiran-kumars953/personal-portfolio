import React, { useEffect } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Expertise from './components/Expertise'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Leadership from './components/Leadership'
import Certifications from './components/Certifications'
import SoftSkills from './components/SoftSkills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  // Smooth-scroll for in-page anchor links, without leaving a "#section" in the URL
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      e.preventDefault();

      const nav = document.querySelector('nav');
      const offset = nav ? nav.offsetHeight : 0;

      if (href === '#' || href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }

      // Keep the address bar clean (no #hash)
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Experience />
      <Projects />
      <Leadership />
      <Certifications />
      <SoftSkills />
      <Contact />
      <Footer />
    </>
  )
}

export default App
