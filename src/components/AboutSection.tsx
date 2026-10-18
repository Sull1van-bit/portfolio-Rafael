import { motion } from 'framer-motion';

interface RoleItem {
  title: string;
  period: string;
  duration?: string;
  points: string[];
  skills: string[];
}

interface OrganizationExperience {
  organization: string;
  totalDuration?: string;
  logo: 'hmif' | 'umnpc' | 'freelance' | 'radioactive';
  roles: RoleItem[];
}

export function AboutSection() {
  const experiences: OrganizationExperience[] = [
    {
      organization: "Freelance Full Stack Developer",
      totalDuration: "Jul 2024 - Present",
      logo: "freelance",
      roles: [
        {
          title: "Full Stack Developer",
          period: "Jul 2024 - Present",
          points: [
            "Build full-stack web applications for clients using React, and Supabase, with a focus on clean architecture and maintainable code.",
            "Work directly with clients from scoping requirements to production release, domain setup, and ongoing updates."
          ],
          skills: ["React","Supabase","Full Stack Development"]
        }
      ]
    },  
    {
      organization: "Himpunan Mahasiswa Informatika (HMIF) UMN",
      totalDuration: "Dec 2024 - Present · 2 yrs",
      logo: "hmif",
      roles: [
        {
          title: "Finance Division Coordinator",
          period: "Dec 2024 - Present",
          duration: "1 yr",
          points: [
            "Manage division budgets, track operational expenses, and approve funding requests across student activities in the informatics department.",
            "Handle merchandise and fundraising at the HMIF Corner, managing inventory, orders, and weekly financial reporting."
          ],
          skills: ["Budgeting", "Financial Planning", "Leadership", "Event Logistics"]
        },
        {
          title: "Public Relations",
          period: "Dec 2024 - Dec 2025",
          duration: "1 yr",
          points: [
            "Produced social media content for HMIF UMN. One video reached 900k+ views and generated over 500k impressions within four months.",
            "Drove 14k+ post interactions, with 81% from non-followers, bringing in 300+ new followers to the department channel."
          ],
          skills: ["Social Media", "Social Media Content Creation", "Media Relations", "Strategic Communication"]
        }
      ]
    },
    {
      organization: "UMN Programming Club",
      totalDuration: "Sep 2025 - Sep 2026 · 1 yr",
      logo: "umnpc",
      roles: [
        {
          title: "Competition Division Coordinator",
          period: "Sep 2025 - Sep 2026",
          duration: "1 yr",
          points: [
            "Authored problem sets and test cases in C and C++ for competitive programming contests, covering sorting, graphs, and dynamic programming.",
            "Judged competition submissions against execution time and memory limits during live rounds."
          ],
          skills: ["C/C++", "Algorithms", "Data Structures", "Problem Solving"]
        }
      ]
    },
    {
      organization: "UMN Radioactive 2025",
      totalDuration: "Jul 2025 - Oct 2025 · 4 mos",
      logo: "radioactive",
      roles: [
        {
          title: "Front End Developer (Website Division)",
          period: "Jul 2025 - Oct 2025",
          points: [
            "Built the official event website for UMN Radioactive's podcast and radio announcing competitions.",
            "Developed responsive registration forms and information pages using React and Tailwind CSS."
          ],
          skills: ["React", "Tailwind CSS", "Front End Architecture"]
        }
      ]
    }
  ];

  const renderLogo = (type: OrganizationExperience['logo']) => {
    switch (type) {
      case 'hmif':
        return (
          <div className="w-10 h-10 sm:w-12 sm:h-12 border border-line bg-[var(--bg)] p-1.5 flex items-center justify-center shrink-0">
            <img
              src="hmif-logo.webp"
              alt="HMIF UMN Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
        );
      case 'umnpc':
        return (
          <div className="w-10 h-10 sm:w-12 sm:h-12 border border-line bg-[#0e1118] p-1 flex items-center justify-center shrink-0">
            <img
              src="umnpc-logo.webp"
              alt="UMN Programming Club Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
        );
      case 'freelance':
        return (
          <div className="w-10 h-10 sm:w-12 sm:h-12 border border-line bg-[var(--bg)] p-1.5 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-[var(--ink)]">
            <svg className="w-6 h-6 text-[var(--ink)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
        );
      case 'radioactive':
        return (
          <div className="w-10 h-10 sm:w-12 sm:h-12 border border-line bg-[#160c1c] p-1 flex items-center justify-center shrink-0">
            <img
              src="radioactive-logo.webp"
              alt="Radioactive UMN 2025 Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
        );
    }
  };

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
              About
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              Background &amp; Education
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
            Informatics student and <span className="font-serif italic font-normal text-[var(--muted)]">software engineer.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-[var(--muted)] text-sm sm:text-base leading-relaxed">
            <p>
              I study informatics at Universitas Multimedia Nusantara and take on freelance web projects. Most of my work involves TypeScript, React, Next.js, and Node.js, usually focused on clean API design, backend security, and straightforward user interfaces.
            </p>
            <p>
              On campus, I coordinate competitive programming contests for the UMN Programming Club and write algorithmic problem sets. In 2025, our team was a national finalist at Garuda Hacks 6.0 with LeftOver, a platform built to reduce surplus food waste.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              Experience
            </h3>
          </div>

          <div className="space-y-6">
            {experiences.map((org, orgIdx) => {
              const isMultiRole = org.roles.length > 1;

              return (
                <div
                  key={orgIdx}
                  className="p-5 sm:p-7 border border-line bg-[var(--card-bg)] space-y-6 transition-colors hover:border-line-strong"
                >
                  <div className="flex items-start gap-4">
                    {renderLogo(org.logo)}
                    <div className="space-y-0.5">
                      <h4 className="font-display text-base sm:text-lg font-medium text-[var(--ink)]">
                        {org.organization}
                      </h4>
                      {org.totalDuration && (
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--muted)]">
                          <span>{org.totalDuration}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative pl-3 sm:pl-5">
                    {isMultiRole && (
                      <div
                        className="absolute left-[17px] sm:left-[25px] top-3 bottom-5 w-[2px] bg-[var(--line-strong)]"
                        aria-hidden="true"
                      />
                    )}

                    <div className="space-y-8">
                      {org.roles.map((role, rIdx) => (
                        <div key={rIdx} className="relative flex items-start gap-4 sm:gap-6">
                          <div
                            className={`w-3 h-3 rounded-full mt-1.5 shrink-0 z-10 transition-transform ${
                              isMultiRole
                                ? 'bg-[var(--ink)] ring-4 ring-[var(--card-bg)]'
                                : 'bg-[var(--line-strong)]'
                            }`}
                            aria-hidden="true"
                          />

                          <div className="space-y-2.5 flex-1 min-w-0">
                            <div>
                              <h5 className="font-display text-base font-medium text-[var(--ink)]">
                                {role.title}
                              </h5>
                              <div className="font-mono text-xs text-[var(--muted)] flex items-center gap-2 mt-0.5">
                                <span>{role.period}</span>
                                {role.duration && (
                                  <>
                                    <span>&middot;</span>
                                    <span>{role.duration}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            <ul className="space-y-1.5 text-sm text-[var(--muted)] leading-relaxed list-disc list-outside pl-4">
                              {role.points.map((pt, pIdx) => (
                                <li key={pIdx}>{pt}</li>
                              ))}
                            </ul>

                            <div className="pt-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-wider mr-1">
                                  Skills:
                                </span>
                                {role.skills.map((skill, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="font-mono text-[10px] px-2 py-0.5 border border-line bg-[var(--bg)] text-[var(--muted)]"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-b border-line pb-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
              Education
            </h3>
          </div>

          <div className="p-5 sm:p-7 border border-line bg-[var(--card-bg)] flex flex-col md:flex-row md:items-start justify-between gap-6 transition-colors hover:border-line-strong">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-line bg-white p-1 flex items-center justify-center shrink-0">
                <img
                  src="umn-logo.webp"
                  alt="Universitas Multimedia Nusantara Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <h4 className="font-display text-base sm:text-lg font-medium text-[var(--ink)]">
                  Universitas Multimedia Nusantara
                </h4>
                <p className="font-display text-sm font-medium text-[var(--ink)]">
                  Bachelor of Computer Science in Informatics
                </p>
                <div className="font-mono text-xs text-[var(--muted)] flex items-center gap-2">
                  <span>2024 - 2028</span>
                </div>

                <div className="pt-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-wider mr-1">
                      Skills:
                    </span>
                    {["Algorithms", "Data Structures", "Web Architecture", "System Security", "Machine Learning"].map((s, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] px-2 py-0.5 border border-line bg-[var(--bg)] text-[var(--muted)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed md:pt-1">
              Relevant coursework in data structures, algorithms, database systems, web programming, and network security.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutSection;
