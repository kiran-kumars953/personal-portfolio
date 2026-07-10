import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css';

const Contact = () => {
  const ref = useRef(null);
  // idle | sending | success | error
  const [status, setStatus] = useState('idle');
  
  // React Form State tracking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const contactLinks = [
    {
      label: 'kirankumar953863@gmail.com',
      href: 'mailto:kirankumar953863@gmail.com',
      external: false,
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/kiran-kumar-s953/',
      external: true,
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.783 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.337-.024-3.058-1.865-3.058-1.867 0-2.154 1.459-2.154 2.964v5.698h-3v-11h2.881v1.504h.041c.4-.757 1.379-1.556 2.839-1.556 3.036 0 3.598 1.998 3.598 4.599v6.453z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: 'https://github.com/kiran-kumars953',
      external: true,
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
  ];

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  // PhoneInput returns the value directly (not an event), so it needs its own handler
  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value || '' }));
  };

  // Handle form submission logic — sends the message to the Proton inbox via EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the painful page-refresh crash
    if (status === 'sending') return; // guard against double submits

    // Strict phone validation against the selected country's format
    if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
      alert("Please enter a valid phone number for the selected country.");
      return;
    }

    try {
      setStatus('sending');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  // True only when something is typed but it isn't a valid number for the chosen country
  const phoneInvalid = Boolean(formData.phone) && !isValidPhoneNumber(formData.phone);

  return (
    <section ref={ref} id="contact" className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900">
      
      {/* Huge Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-white uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Form Card Overlay (Upgraded from AOS to Framer Motion built-in viewport engine) */}
      <div className="relative z-10 w-full flex justify-center items-end px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#141414] border-x border-t border-white/10 rounded-t-[2rem] md:rounded-t-[2.5rem] w-full max-w-5xl p-8 md:p-14 text-white flex flex-col justify-between shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="text-xs font-bold tracking-[0.2em] mb-8 uppercase text-[#ff2a2a]">
            Reach Us
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10 md:mb-14 pb-10 md:pb-14 border-b border-white/10">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white/80 hover:border-[#ff2a2a]/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white group-hover:bg-[#ff2a2a] transition-colors duration-300">
                  {item.icon}
                </span>
                {item.label}
              </a>
            ))}
            <span className="flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white/80">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </span>
              Bangalore, Karnataka, India
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Kiran"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-base font-medium placeholder-white/30 focus:outline-none focus:bg-white/[0.07] focus:border-[#ff2a2a] transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Kumar S"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-base font-medium placeholder-white/30 focus:outline-none focus:bg-white/[0.07] focus:border-[#ff2a2a] transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-base font-medium placeholder-white/30 focus:outline-none focus:bg-white/[0.07] focus:border-[#ff2a2a] transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                    Phone
                  </label>
                  <PhoneInput
                    id="phone"
                    international
                    limitMaxLength
                    countryCallingCodeEditable={false}
                    defaultCountry="IN"
                    flags={flags}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter phone number"
                    className={`contact-phone-input w-full bg-white/5 border rounded-xl px-4 py-3.5 transition-all duration-300 ${
                      phoneInvalid
                        ? 'border-red-500 focus-within:border-red-500'
                        : 'border-white/15 focus-within:bg-white/[0.07] focus-within:border-[#ff2a2a]'
                    }`}
                  />
                  {phoneInvalid && (
                    <p className="mt-2 text-xs font-semibold text-red-400">
                      Enter a valid phone number for the selected country.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                  className="w-full h-full min-h-[220px] bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-base font-medium placeholder-white/30 focus:outline-none focus:bg-white/[0.07] focus:border-[#ff2a2a] transition-all duration-300 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col items-start md:items-end gap-4 mt-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-3 rounded-full bg-[#ff2a2a] text-white font-bold flex items-center justify-center gap-3 hover:bg-white hover:text-[#ff2a2a] transition-all duration-300 group whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              {/* Submission status feedback */}
              {status === 'success' && (
                <p className="text-sm font-semibold text-green-400">✓ Thanks! Your message has been sent — I'll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-sm font-semibold text-red-400">✕ Something went wrong. Please try again or email me directly.</p>
              )}
            </div>
          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;