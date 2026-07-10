import React from 'react';
import { motion } from 'framer-motion';

const Certifications = () => {
  const certifications = [
    { title: 'Generative AI & Tableau', issuer: 'Unifirst Robotics', date: 'Oct 2023' },
    { title: 'Foundation of AI', issuer: 'Infosys SpringBoard', date: 'Mar 2024' },
    { title: 'Machine Learning Foundation', issuer: 'NASSCOM', date: 'Jun 2023' },
    { title: 'Application Developer (Web & Mobile)', issuer: 'Rooman Technologies', date: 'Apr 2025' },
    { title: 'Software Engineering Virtual Internship', issuer: 'J.P. Morgan Chase & Co.', date: 'Mar 2024' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <section id="certifications" className="bg-white py-20 md:py-28 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-block border border-black/15 rounded-full px-5 py-1.5 text-sm text-black/60 font-bold mb-6 bg-black/[0.02]">
            Certifications
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-black leading-tight tracking-tight">
            Credentials & Learning
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="bg-white border border-black/10 rounded-2xl p-6 flex items-start justify-between gap-4 shadow-sm hover:shadow-xl hover:border-black/20 transition-all duration-300"
            >
              <div>
                <h3 className="text-black font-bold text-base md:text-lg mb-1 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-black/50 text-sm font-medium">{cert.issuer}</p>
              </div>
              <span className="shrink-0 text-xs font-bold text-black/40 uppercase tracking-widest whitespace-nowrap mt-1">
                {cert.date}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative stars */}
      <div className="absolute top-10 right-10 md:right-20 text-black opacity-[0.05] animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </section>
  );
};

export default Certifications;
