import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projectsData = [
    {
      name: 'Insurance Management Platform (Policy Flow)',
      date: 'Dec 2025',
      description:
        'Developed and enhanced policy-management workflows for an enterprise insurance platform, integrating frontend and backend modules through RESTful APIs to support business process automation and policy lifecycle management.',
      tech: ['React.js', 'Java', 'REST APIs'],
    },
    {
      name: 'AI Handwritten Text Extractor',
      date: 'Nov 2025',
      description:
        'Built an OCR-based handwritten text extraction system, applying image preprocessing techniques including thresholding, denoising, and contrast enhancement to automate conversion of handwritten notes into editable digital text.',
      tech: ['Python', 'OpenCV', 'Tesseract OCR'],
    },
    {
      name: 'Deepfake Detection System - TRUST',
      date: 'Dec 2024 - Feb 2025',
      description:
        'Developed a CNN-based deepfake detection model achieving 92% accuracy in identifying manipulated images and videos, with image preprocessing, feature extraction, and visualization modules that reduced manual review effort by 40%.',
      tech: ['CNN', 'Image Preprocessing', 'Feature Extraction'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 14 },
    },
  };

  return (
    <section id="projects" className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(0,0,0,.05)_25%,rgba(0,0,0,.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,.05)_75%,rgba(0,0,0,.05)_76%,transparent_77%,transparent),linear-gradient(0deg,transparent_24%,rgba(0,0,0,.05)_25%,rgba(0,0,0,.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,.05)_75%,rgba(0,0,0,.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 md:mb-14"
        >
          <div className="inline-block border border-black/15 rounded-full px-5 py-1.5 text-sm text-black/60 font-bold mb-8 bg-black/[0.02]">
            Featured Projects
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[1.1] mb-6 tracking-tight">
            Work that speaks <br className="hidden md:block" />for itself
          </h2>
          <p className="text-black/60 text-base md:text-lg max-w-lg font-medium leading-relaxed">
            A selection of enterprise, AI, and full-stack projects I've built and shipped.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="group relative bg-white border border-black/5 rounded-3xl p-6 flex flex-col shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-red-500/5 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <span className="text-xs font-semibold text-red-500 uppercase tracking-widest mb-3">
                  {project.date}
                </span>
                <h3 className="text-lg font-bold text-black mb-3 tracking-tight leading-snug">
                  {project.name}
                </h3>
                <p className="text-sm text-black/60 leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-medium text-black bg-black/3 border border-black/5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
