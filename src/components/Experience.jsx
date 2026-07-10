import React from 'react';

const experienceList = [
  {
    organization: 'Aseuro Technologies',
    role: 'Software Engineer - AI',
    duration: 'Sep 2025 - June 2026',
    location: 'Bangalore, India',
    type: 'Full-time',
    points: [
      'Implemented AWS AppConfig feature flags to support controlled feature rollouts and environment-based configuration management.',
      'Worked with Docker containers and Jenkins CI/CD pipelines to streamline deployment and release processes.',
      'Supported Salesforce-based insurance management applications through development, testing, bug fixes, and production support.',
      'Worked in Agile development environments across testing, deployment, release, and production support activities.',
    ],
    tech: ['AWS AppConfig', 'Docker', 'Jenkins', 'Salesforce', 'Agile'],
  },
  {
    organization: 'Rooman Technologies',
    role: 'Application Developer Intern',
    duration: 'Oct 2024 - Dec 2024',
    location: 'Bangalore, India',
    type: 'Internship',
    points: [
      'Developed and documented 8+ RESTful API endpoints using Node.js and MySQL for web application functionality.',
      'Used Git-based version control and Postman for API testing, debugging, validation, and integration testing.',
      'Collaborated with development teams to build scalable backend components and improve application reliability.',
    ],
    tech: ['Node.js', 'MySQL', 'REST APIs', 'Git', 'Postman'],
  },
  {
    organization: 'J.P. Morgan Chase & Co.',
    role: 'Software Engineering Virtual Intern',
    duration: 'Feb 2024 - Mar 2024',
    location: 'Remote',
    type: 'Internship',
    points: [
      'Developed trading simulation modules and stock price analysis features.',
      'Earned official certification upon completion.',
    ],
    tech: [],
  },
  {
    organization: 'NASSCOM Foundation',
    role: 'Machine Learning Intern',
    duration: 'May 2023 - Jun 2023',
    location: 'Bangalore, India',
    type: 'Internship',
    points: [
      'Completed 2 ML projects (classification, regression, clustering) with ~90% accuracy.',
      'Co-led a 4-member team to present ML prototypes, earning top-3 recognition in a showcase.',
    ],
    tech: ['Machine Learning', 'Classification', 'Regression', 'Clustering'],
  },
];

const ExperienceCard = ({ exp, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={(index % 2) * 150}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:scale-[1.02] hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 flex flex-col justify-between"
  >
    <div>
      <div className="flex justify-between items-start mb-6 gap-4">
        <span className="text-white/40 text-xs font-mono font-bold tracking-widest uppercase">
          {exp.duration}
        </span>
        <span className="bg-white/10 text-white text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-white/15 whitespace-nowrap">
          {exp.type}
        </span>
      </div>

      <h3 className="text-white text-2xl font-black mb-1 tracking-tight">
        {exp.role}
      </h3>
      <p className="text-white/70 text-sm font-black tracking-wide mb-1 uppercase">
        {exp.organization}
      </p>
      <p className="text-white/50 text-xs font-semibold tracking-wide mb-6">
        {exp.location}
      </p>

      {/* Key contributions */}
      <div className="mb-6">
        <h4 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Key Contributions:</h4>
        <ul className="text-white/90 text-sm font-medium space-y-1.5 pl-4 list-disc marker:text-white/40">
          {exp.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>

    {/* Technologies used */}
    {exp.tech.length > 0 && (
      <div className="pt-4 border-t border-white/10">
        <h4 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">Technologies:</h4>
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-mono font-bold text-white bg-white/10 rounded-full border border-white/10 hover:bg-white/20 transition-all"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const Experience = () => {
  return (
    <section id="experience" className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]">
      <div className="max-w-6xl mx-auto relative z-20">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            Career
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
            Work Experience
          </h2>
          <p className="text-white/50 text-base md:text-lg font-semibold max-w-lg mx-auto">
            Engineering roles and internships where I built, tested, and shipped real-world software.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {experienceList.map((exp, index) => (
            <ExperienceCard key={exp.organization} exp={exp} index={index} />
          ))}
        </div>

      </div>

      {/* Decorative stars */}
      <div className="absolute top-10 right-10 text-white opacity-[0.06] animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
      <div className="absolute bottom-10 left-10 text-white opacity-[0.06] animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </section>
  );
};

export default Experience;
