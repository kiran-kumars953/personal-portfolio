import React from 'react';
import { motion } from 'framer-motion';
 
const Skills = () => {
  const skillsData = [
    {
      category: 'Programming & Fundamentals',
      skills: ['Java', 'JavaScript', 'Python', 'SQL', 'Data Structures', 'Algorithms', 'OOP'],
    },
    {
      category: 'Frontend Development',
      skills: ['React.js', 'HTML5', 'CSS3', 'Responsive Web Design', 'Wireframing', 'Reusable UI Components'],
    },
    {
      category: 'Backend & Databases',
      skills: ['Java', 'Node.js', 'REST APIs', 'JWT Authentication', 'MySQL'],
    },
    {
      category: 'Tools, Testing & Cloud',
      skills: ['Git', 'GitHub', 'Docker', 'Jenkins', 'Postman', 'Unit Testing', 'Integration Testing', 'API Testing', 'AWS AppConfig', 'ChatGPT', 'Cursor'],
    },
  ];
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
 
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };
 
  const skillPillVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };
 
  const SkillCard = ({ category, skills, index }) => {
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{
          y: -8,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        }}
        className="group relative bg-white border border-black/5 rounded-3xl p-6 h-fit shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-500"
      >
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-red-500/5 transition-all duration-500 pointer-events-none" />
 
        {/* Card content */}
        <div className="relative z-10">
          <h3 className="text-sm font-semibold text-black mb-4 tracking-tight">
            {category}
          </h3>
 
          {/* Skills pills container */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <motion.button
                key={idx}
                variants={skillPillVariants}
                initial="initial"
                whileHover="hover"
                className="px-3 py-1.5 text-xs font-medium text-black bg-black/3 hover:bg-red-500/10 border border-black/5 hover:border-red-500/20 rounded-full transition-all duration-300 cursor-default select-none hover:text-red-500"
              >
                {skill}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };
 
  return (
    <section id="skills" className="relative w-full bg-white py-16 md:py-20 overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(0,0,0,.05)_25%,rgba(0,0,0,.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,.05)_75%,rgba(0,0,0,.05)_76%,transparent_77%,transparent),linear-gradient(0deg,transparent_24%,rgba(0,0,0,.05)_25%,rgba(0,0,0,.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,.05)_75%,rgba(0,0,0,.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
      </div>
 
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 md:mb-12"
        >
          <div className="mb-3">
            <span className="inline-block text-xs font-semibold text-black/50 uppercase tracking-widest px-3 py-1.5 bg-black/2 border border-black/5 rounded-full">
              Technical Stack
            </span>
          </div>
 
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-2 tracking-tight">
            Technologies I Work With
          </h2>
 
          <p className="text-sm text-black/60 font-normal">
            Full-stack development expertise across programming, enterprise software, testing, and cloud tooling.
          </p>
        </motion.div>
 
        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {skillsData.map((item, idx) => (
            <SkillCard
              key={idx}
              category={item.category}
              skills={item.skills}
              index={idx}
            />
          ))}
        </motion.div>
      </div>
 
      {/* Floating accent elements - very subtle */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 right-10 w-32 h-32 bg-red-500 rounded-full blur-3xl pointer-events-none"
      />
 
      <motion.div
        animate={{
          y: [0, -8, 0],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 left-5 w-40 h-40 bg-red-500 rounded-full blur-3xl pointer-events-none"
      />
    </section>
  );
};
 
export default Skills;
 