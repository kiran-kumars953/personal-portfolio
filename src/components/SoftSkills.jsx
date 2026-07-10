import React from 'react';

// Soft skills derived only from evidence in the resume (leadership roles,
// cross-functional collaboration, Agile work, testing, and continuous learning).
const softSkillsList = [
  {
    name: 'Leadership',
    icon: '👑',
    desc: 'Chaired the IEEE Computer Society, organized workshops & hackathons, and co-led team projects.',
  },
  {
    name: 'Team Collaboration',
    icon: '🤝',
    desc: 'Collaborated with cross-functional and development teams to deliver reliable software.',
  },
  {
    name: 'Communication',
    icon: '💬',
    desc: 'Presented ML prototypes and onboarded 50+ students into training programs.',
  },
  {
    name: 'Agile Mindset',
    icon: '🔄',
    desc: 'Worked across testing, deployment, release, and production support in Agile environments.',
  },
  {
    name: 'Problem Solving',
    icon: '🧩',
    desc: 'Resolved production issues through debugging, bug fixes, and support activities.',
  },
  {
    name: 'Attention to Detail',
    icon: '🔍',
    desc: 'Ensured reliability through unit, integration, and API testing.',
  },
  {
    name: 'Continuous Learning',
    icon: '📚',
    desc: 'Passionate about continuously learning modern development practices.',
  },
  {
    name: 'Adaptability',
    icon: '🌟',
    desc: 'Adapted across full-stack development, AI, and cloud tools in fast-paced teams.',
  },
];

const SoftSkillCard = ({ skill, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={(index % 4) * 100}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:scale-[1.03] hover:bg-white/[0.08] hover:border-white/30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)] transition-all duration-500 group flex flex-col items-center text-center justify-between min-h-[230px]"
  >
    <div className="flex flex-col items-center">
      <div className="text-4xl mb-4 p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
        {skill.icon}
      </div>
      <h3 className="text-white text-lg font-black tracking-tight mb-2 uppercase">
        {skill.name}
      </h3>
      <p className="text-white/50 text-sm font-medium leading-relaxed">
        {skill.desc}
      </p>
    </div>
  </div>
);

const SoftSkills = () => {
  return (
    <section id="soft-skills" className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]">
      <div className="max-w-6xl mx-auto relative z-20">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            Core Competencies
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            Professional Soft Skills
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Essential traits that make me an effective engineer, coordinator, and communicator.
          </p>
        </div>

        {/* Soft Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkillsList.map((skill, index) => (
            <SoftSkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SoftSkills;
