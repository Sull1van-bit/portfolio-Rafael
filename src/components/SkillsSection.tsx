import { motion } from 'framer-motion';

export function SkillsSection() {
  const skillCategories = [
    {
      index: "01",
      category: "Programming Languages",
      skills: ["JavaScript", "Python", "Go", "C/C++", "Kotlin", "C#"]
    },
    {
      index: "02",
      category: "Frameworks & Libraries",
      skills: ["React", "Next.js", "Node.js", "Tailwind CSS"]
    },
    {
      index: "03",
      category: "Software & Tools",
      skills: ["Git", "Docker", "Figma", "Linux", "Postman", "Hermes","Google Anti Gravity", "Android Studio", "Unity", "VS Code"]
    },
    {
      index: "04",
      category: "Leadership & Management",
      skills: ["Team Leadership", "Project Management", "Strategic Planning", "Event Logistics", "Problem Solving", "Cross-functional Collaboration"]
    }
  ];

  const awards = [
    {
      title: "Finalist of Sustainability Track",
      event: "Garuda Hacks 6.0",
      date: "July 2025",
      note: "International finalist out of 400+ teams for LeftOver, a web application designed to reduce food waste in Indonesia."
    }
  ];

  const languages = [
    { name: "Indonesian", level: "Native or bilingual proficiency" },
    { name: "English", level: "Professional working proficiency" }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="space-y-4 border-b border-line pb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 bg-[var(--invert-bg)] text-[var(--invert-fg)]">
              Skills
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
            Technical toolkit &amp; <span className="font-serif italic font-normal text-[var(--muted)]">technologies.</span>
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base max-w-xl leading-relaxed">
            Some tools, technologies, and skills I've acquired throughout my journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-line bg-[var(--card-bg)]">
          {skillCategories.map(({ index, category, skills }) => (
            <div
              key={category}
              className="p-6 md:p-8 border-b border-line md:even:border-l last:border-b-0 md:nth-last-2:border-b-0 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-medium text-[var(--ink)]">
                  {category}
                </h3>
                <span className="font-mono text-[11px] text-[var(--muted)]">
                  {index}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-2.5 py-1 border border-line bg-[var(--bg)] text-[var(--muted)] hover:border-line-strong hover:text-[var(--ink)] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
          <div className="md:col-span-7 space-y-4">
            <div className="border-b border-line pb-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Awards &amp; Recognition
              </h3>
            </div>

            <div className="border border-line bg-[var(--card-bg)] p-6 space-y-2">
              {awards.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-display text-base font-medium text-[var(--ink)]">
                        {item.title}
                      </h4>
                      <p className="font-mono text-xs text-[var(--muted)] mt-0.5">
                        {item.event} &middot; {item.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 space-y-4">
            <div className="border-b border-line pb-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Languages
              </h3>
            </div>

            <div className="border border-line bg-[var(--card-bg)] p-6 divide-y divide-line">
              {languages.map((lang, idx) => (
                <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between">
                  <span className="font-display text-sm font-medium text-[var(--ink)]">
                    {lang.name}
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SkillsSection;
