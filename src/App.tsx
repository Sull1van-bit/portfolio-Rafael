import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from './components/ProfileCard';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CircuitBoard3D } from './components/CircuitBoard3D';
import { CursorGrid } from './components/CursorGrid';
import { LogoLoop, type LogoItem } from './components/LogoLoop';
import { TechText } from './components/TechText';
import { DecryptedText } from './components/DecryptedText';
import { TransparentRuler } from './components/TransparentRuler';
import { IntroPreloader } from './components/IntroPreloader';
import {
  FaBars,
  FaTimes,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaCopy,
  FaCheck,
  FaArrowRight,
  FaSun,
  FaMoon,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPython,
  SiGo,
  SiDocker,
  SiPostgresql,
  SiGit,
  SiVite
} from 'react-icons/si';

const techLogos: LogoItem[] = [
  {
    node: <SiReact className="w-7 h-7 text-[#61DAFB]" />,
    title: 'React',
    hoverColor: '#61DAFB'
  },
  {
    node: <SiNextdotjs className="w-7 h-7 text-current" />,
    title: 'Next.js',
    hoverColor: '#38bdf8'
  },
  {
    node: <SiTypescript className="w-7 h-7 text-[#3178C6]" />,
    title: 'TypeScript',
    hoverColor: '#3178C6'
  },
  {
    node: <SiNodedotjs className="w-7 h-7 text-[#5FA04E]" />,
    title: 'Node.js',
    hoverColor: '#5FA04E'
  },
  {
    node: <SiTailwindcss className="w-7 h-7 text-[#06B6D4]" />,
    title: 'Tailwind CSS',
    hoverColor: '#06B6D4'
  },
  {
    node: <SiPython className="w-7 h-7 text-[#3776AB]" />,
    title: 'Python',
    hoverColor: '#3776AB'
  },
  {
    node: <SiGo className="w-7 h-7 text-[#00ADD8]" />,
    title: 'Go',
    hoverColor: '#00ADD8'
  },
  {
    node: <SiDocker className="w-7 h-7 text-[#2496ED]" />,
    title: 'Docker',
    hoverColor: '#2496ED'
  },
  {
    node: <SiPostgresql className="w-7 h-7 text-[#4169E1]" />,
    title: 'PostgreSQL',
    hoverColor: '#4169E1'
  },
  {
    node: <SiGit className="w-7 h-7 text-[#F05032]" />,
    title: 'Git',
    hoverColor: '#F05032'
  },
  {
    node: <SiVite className="w-7 h-7 text-[#646CFF]" />,
    title: 'Vite',
    hoverColor: '#646CFF'
  }
];

function App() {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isIntroDocked, setIsIntroDocked] = useState(false);
  const [waveTrigger, setWaveTrigger] = useState(0);
  const [waveOrigin, setWaveOrigin] = useState<{ x: number; y: number }>({ x: 32, y: 24 });

  const handlePreloaderComplete = useCallback((coords?: { x: number; y: number }) => {
    if (coords && homeRef.current) {
      const rect = homeRef.current.getBoundingClientRect();
      setWaveOrigin({
        x: coords.x - rect.left,
        y: coords.y - rect.top
      });
    } else if (coords) {
      setWaveOrigin(coords);
    }
    setWaveTrigger((prev) => prev + 1);
    setIsIntroDocked(true);
  }, []);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch {
      void 0;
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      void 0;
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', ref: homeRef },
    { id: 'about', label: 'About', ref: aboutRef },
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'skills', label: 'Skills', ref: skillsRef },
    { id: 'contact', label: 'Contact', ref: contactRef }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'projects', ref: projectsRef },
        { id: 'skills', ref: skillsRef },
        { id: 'contact', ref: contactRef },
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const top = section.ref.current.offsetTop;
          const height = section.ref.current.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rafaelromelogibran400@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)] min-h-screen relative font-display selection:bg-[var(--invert-bg)] selection:text-[var(--invert-fg)]">
      {!isIntroDocked && (
        <IntroPreloader
          onComplete={handlePreloaderComplete}
        />
      )}
      <nav
        id="site-nav"
        className="sticky top-0 left-0 z-40 w-full border-b border-line bg-[var(--nav-bg)] backdrop-blur-md"
      >
        <div className="flex h-12 items-stretch justify-between">
          <div className="flex min-w-0 items-stretch">
            <button
              type="button"
              onClick={() => scrollToSection(homeRef)}
              className="flex items-center gap-2.5 border-r border-line px-4 sm:px-5 font-mono text-xs font-bold tracking-wider text-[var(--ink)] hover:bg-[var(--invert-bg)] hover:text-[var(--invert-fg)] transition-colors cursor-pointer group"
            >
              <svg
                id="site-nav-logo-icon"
                className={`w-4 h-4 text-[var(--ink)] group-hover:text-[var(--invert-fg)] flex-shrink-0 transition-opacity duration-200 ${
                  isIntroDocked ? 'opacity-100' : 'opacity-0'
                }`}
                viewBox="0 0 512 512"
                fill="none"
                aria-hidden="true"
              >
                <path d="M128 80H288C358.686 80 416 137.314 416 208C416 261.272 383.398 306.918 337.285 326.111L416 432H336L268.421 336H208V432H128V80Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                <path d="M208 152H280C310.928 152 336 177.072 336 208C336 238.928 310.928 264 280 264H208V152Z" fill="var(--bg)"/>
                <path d="M384 80L448 144V272L384 208V80Z" fill="currentColor" opacity="0.4"/>
                <path d="M336 432L400 432L320 336L268 336L336 432Z" fill="currentColor" opacity="0.6"/>
              </svg>
              <span className="truncate hidden sm:inline">RAFAEL ROMELO GIBRAN</span>
              <span className="truncate sm:hidden">RAFAEL</span>
            </button>

            <div className="hidden md:flex items-stretch border-r border-line">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.ref)}
                  className={`flex items-center px-4 hud-label border-r border-line transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-[var(--invert-bg)] text-[var(--invert-fg)]'
                      : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--line)]/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-stretch">
            <div className="hidden lg:flex items-center gap-2 px-4 border-l border-line font-mono text-[10px] uppercase text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <DecryptedText text="Looking for internship" speed={45} maxIterations={10} animateOn="hover" />
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="flex w-12 items-center justify-center border-l border-line text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <FaSun className="w-3.5 h-3.5" />
              ) : (
                <FaMoon className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => scrollToSection(contactRef)}
              className="inline-flex items-center justify-center font-mono font-bold uppercase tracking-[0.14em] text-[11px] bg-[var(--invert-bg)] text-[var(--invert-fg)] hover:opacity-85 transition-opacity px-5 border-l border-line cursor-pointer"
            >
              Get in touch
            </button>

            <div className="flex items-stretch md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="flex w-12 items-center justify-center border-l border-line text-[var(--muted)] hover:bg-[var(--invert-bg)] hover:text-[var(--invert-fg)] transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-4 h-4" />
                ) : (
                  <FaBars className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <TransparentRuler activeSection={activeSection} />

      <div className="relative z-10">
        <main id="main">
          <section
            ref={homeRef}
            id="home"
            className="min-h-[calc(100vh-3rem)] flex flex-col justify-between border-b border-line bg-[var(--bg)] relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <CircuitBoard3D />
            </div>

            <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden" aria-hidden="true">
              <CursorGrid
                cellSize={52}
                radius={200}
                color={theme === 'dark' ? '#38bdf8' : '#0284c7'}
                gridColor={theme === 'dark' ? '#38bdf8' : '#0284c7'}
                gridOpacity={theme === 'dark' ? 0.08 : 0.05}
                spotlight={0.35}
                clickPulse={true}
                edgeFade={0.25}
                lightMode={theme === 'light'}
                waveTrigger={waveTrigger}
                waveOrigin={waveOrigin}
              />
            </div>

            <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-16 pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12 relative z-10 pointer-events-none my-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
                <div className="w-full lg:w-3/5 space-y-5 text-center lg:text-left pointer-events-auto">
                  <motion.div
                    initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                    animate={isIntroDocked ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                    transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 border border-line px-3.5 py-1.5 bg-[var(--card-bg)]/90 backdrop-blur-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)]">
                      <DecryptedText text="Looking for internship" speed={40} maxIterations={12} animateOn="view" revealDirection="start" />
                    </span>
                  </motion.div>

                  <div>
                    <h1 className="sr-only">Rafael Romelo Gibran, software engineer</h1>
                    <div className="hidden sm:block h-28 lg:h-32 xl:h-36 w-full -ml-4 sm:-ml-6 lg:-ml-8 text-[var(--ink)]">
                      {isIntroDocked && (
                        <TechText
                          text="Rafael Romelo Gibran"
                          align="left"
                          fontFamily="'Instrument Serif', Georgia, serif"
                          fontSize={116}
                          fontWeight={400}
                          letterSpacing={-0.01}
                          color={theme === 'dark' ? '#f2f1ee' : '#121316'}
                          accentColor={theme === 'dark' ? '#38bdf8' : '#0284c7'}
                          lineStyle="dashed"
                          intro="metrics"
                          introDuration={1.8}
                          guides={false}
                          labels={false}
                          selection={true}
                        />
                      )}
                    </div>
                    <div className="block sm:hidden w-full space-y-1 text-[var(--ink)] -ml-2">
                      {isIntroDocked && (
                        <>
                          <div className="h-16 w-full">
                            <TechText
                              text="Rafael Romelo"
                              align="left"
                              fontFamily="'Instrument Serif', Georgia, serif"
                              fontSize={78}
                              fontWeight={400}
                              letterSpacing={-0.01}
                              color={theme === 'dark' ? '#f2f1ee' : '#121316'}
                              accentColor={theme === 'dark' ? '#38bdf8' : '#0284c7'}
                              lineStyle="dashed"
                              intro="metrics"
                              introDuration={1.8}
                              guides={false}
                              labels={false}
                              selection={true}
                            />
                          </div>
                          <div className="h-14 w-full">
                            <TechText
                              text="Gibran"
                              align="left"
                              fontFamily="'Instrument Serif', Georgia, serif"
                              fontSize={78}
                              fontWeight={400}
                              letterSpacing={-0.01}
                              color={theme === 'dark' ? '#f2f1ee' : '#121316'}
                              accentColor={theme === 'dark' ? '#38bdf8' : '#0284c7'}
                              lineStyle="dashed"
                              intro="metrics"
                              introDuration={1.8}
                              guides={false}
                              labels={false}
                              selection={true}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                      animate={isIntroDocked ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                      transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                      className="font-serif italic font-normal text-3xl sm:text-4xl lg:text-5xl text-[var(--muted)] tracking-tight mt-1"
                    >
                      software engineer.
                    </motion.div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                    animate={isIntroDocked ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                    transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[var(--muted)] text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  >
                    Informatics student at Universitas Multimedia Nusantara building web applications with TypeScript, React, Next.js, and Node.js. Focused on backend security, clean API contracts, and practical software design.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isIntroDocked ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap gap-3.5 justify-center lg:justify-start pt-1"
                  >
                    <button
                      type="button"
                      onClick={() => scrollToSection(projectsRef)}
                      className="font-mono text-xs font-bold uppercase tracking-[0.14em] px-8 py-4 bg-[var(--invert-bg)] text-[var(--invert-fg)] hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-2.5 shadow-lg"
                    >
                      <span>View projects</span>
                      <FaArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection(aboutRef)}
                      className="font-mono text-xs font-medium uppercase tracking-[0.14em] px-7 py-4 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
                    >
                      About me
                    </button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={isIntroDocked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-2/5 flex justify-center lg:justify-end pointer-events-auto"
                >
                  <div className="w-full max-w-[360px] lg:max-w-[400px] relative overflow-hidden">
                    <motion.div
                      initial={{ clipPath: 'inset(0 0 100% 0)' }}
                      animate={isIntroDocked ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
                      transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProfileCard
                        name="Rafael Romelo Gibran"
                        title="Software Engineer"
                        avatarUrl="muka.webp"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ top: '0%', opacity: 1 }}
                      animate={isIntroDocked ? { top: '100%', opacity: 0 } : { top: '0%', opacity: 1 }}
                      transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none shadow-[0_0_12px_rgba(56,189,248,0.85)] z-20"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isIntroDocked ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="w-full relative z-20 border-t border-line bg-[var(--bg)]/75 backdrop-blur-sm py-3 sm:py-4 overflow-hidden pointer-events-auto"
            >
              <LogoLoop
                logos={techLogos}
                speed={40}
                direction="left"
                logoHeight={26}
                gap={48}
                pauseOnHover={true}
                scaleOnHover={true}
                labels="none"
                fadeOut={true}
                fadeOutWidth={0.08}
                ariaLabel="Technologies and frameworks"
                className="text-[var(--ink)]"
              />
            </motion.div>
          </section>

          <section
            ref={aboutRef}
            id="about"
            className="py-24 border-b border-line bg-[var(--bg)]"
          >
            <AboutSection />
          </section>

          <section
            ref={projectsRef}
            id="projects"
            className="py-24 border-b border-line bg-[var(--card-bg)]/40"
          >
            <ProjectsSection />
          </section>

          <section
            ref={skillsRef}
            id="skills"
            className="py-24 border-b border-line bg-[var(--bg)]"
          >
            <SkillsSection />
          </section>

          <section
            ref={contactRef}
            id="contact"
            className="py-24 bg-[var(--card-bg)]/40"
          >
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="border border-line bg-[var(--card-bg)] p-8 md:p-14 text-center space-y-8 relative"
              >
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>
                <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>
                <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>

                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 bg-[var(--invert-bg)] text-[var(--invert-fg)]">
                    Contact
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    Get in touch
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
                    Available for <span className="font-serif italic font-normal text-[var(--muted)]">internship roles.</span>
                  </h2>
                  <p className="text-[var(--muted)] text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                    Currently looking for software engineering internships and junior developer opportunities. If you have an opening or a project in mind, my inbox is open.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="mailto:rafaelromelogibran400@gmail.com"
                    aria-label="Send email to rafaelromelogibran400@gmail.com"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] px-8 py-3.5 bg-[var(--invert-bg)] text-[var(--invert-fg)] hover:opacity-85 transition-opacity cursor-pointer"
                  >
                    <span>Send email</span>
                    <FaArrowRight className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <FaCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Address copied</span>
                      </>
                    ) : (
                      <>
                        <FaCopy className="w-3.5 h-3.5 text-[var(--muted)]" />
                        <span>Copy email</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-left border-t border-line text-xs font-mono text-[var(--muted)]">
                  <div className="flex items-center gap-2.5">
                    <FaEnvelope className="w-3.5 h-3.5 text-[var(--ink)]" />
                    <span className="truncate">rafaelromelogibran400@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-[var(--ink)]" />
                    <span>Indonesia</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--muted)]">
                  <p>RAFAEL ROMELO GIBRAN</p>
                  <ul className="flex items-center gap-2">
                    <li>
                      <a
                        href="https://github.com/Sull1van-bit"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Rafael's GitHub profile"
                        className="w-9 h-9 border border-line flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:border-line-strong transition-colors cursor-pointer"
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/rafael-romelo-615657289/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Rafael's LinkedIn profile"
                        className="w-9 h-9 border border-line flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:border-line-strong transition-colors cursor-pointer"
                      >
                        <FaLinkedinIn className="w-4 h-4" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/rafael_romelo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Rafael's Instagram profile"
                        className="w-9 h-9 border border-line flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:border-line-strong transition-colors cursor-pointer"
                      >
                        <FaInstagram className="w-4 h-4" />
                      </a>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-[var(--bg)]/95 backdrop-blur-md z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div
                className="h-full w-full p-6 flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="font-mono text-xs font-bold tracking-wider text-[var(--ink)]">
                    NAVIGATION
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="w-10 h-10 border border-line flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 divide-y divide-line">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => scrollToSection(item.ref)}
                      className="flex items-center justify-between py-4 text-left w-full text-base font-mono uppercase tracking-wider text-[var(--ink)] hover:pl-2 transition-all cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-[var(--muted)]">0{index + 1}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-6 border-t border-line font-mono text-xs text-[var(--muted)] text-center flex items-center justify-between">
                  <span>RAFAEL ROMELO GIBRAN</span>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center gap-2 border border-line px-3 py-1.5 text-xs text-[var(--ink)] cursor-pointer"
                  >
                    {theme === 'dark' ? <FaSun className="w-3 h-3" /> : <FaMoon className="w-3 h-3" />}
                    <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
