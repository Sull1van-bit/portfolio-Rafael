import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from './components/ProfileCard';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { Dock } from './components/Dock';

// Icons for the dock and mobile menu
import { FaHome, FaUser, FaBriefcase, FaCode, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

function App() {
  // Define refs for scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Navigation items - minimal gray icons
  const navItems = [
    { icon: <FaHome className="w-5 h-5 text-gray-600" />, label: "Home", onClick: () => scrollToSection(homeRef) },
    { icon: <FaUser className="w-5 h-5 text-gray-600" />, label: "About", onClick: () => scrollToSection(aboutRef) },
    { icon: <FaBriefcase className="w-5 h-5 text-gray-600" />, label: "Projects", onClick: () => scrollToSection(projectsRef) },
    { icon: <FaCode className="w-5 h-5 text-gray-600" />, label: "Skills", onClick: () => scrollToSection(skillsRef) },
    { icon: <FaEnvelope className="w-5 h-5 text-gray-600" />, label: "Contact", onClick: () => scrollToSection(contactRef) }
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen relative overflow-x-hidden">
      {/* Clean minimal background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>

      {/* Content overlay */}
      <div className="relative z-10">
        <div className="min-h-screen">
          {/* Home/Hero Section */}
          <section
            ref={homeRef}
            id="home"
            className="min-h-screen flex flex-col justify-center p-8 border-b border-gray-200"
          >
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="md:w-2/5 text-center md:text-left px-4 md:px-0"
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-900">
                    Hi, I'm <span className="text-gray-700">Rafael</span>
                  </h1>

                  <p className="text-xl md:text-2xl mb-8 text-gray-600 font-light leading-relaxed">
                    Fullstack Developer crafting exceptional digital experiences with
                    <span className="text-gray-800 font-medium"><br />modern web technologies</span>
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button
                      onClick={() => scrollToSection(aboutRef)}
                      className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-200 cursor-pointer"
                    >
                      About Me
                    </button>
                    <button
                      onClick={() => scrollToSection(projectsRef)}
                      className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-8 rounded-full border border-gray-300 transition-all duration-200 cursor-pointer"
                    >
                      Projects
                    </button>
                  </div>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="md:w-2/5 flex justify-center md:justify-end px-4 md:px-0"
                >
                  <div className="w-full max-w-sm">
                    <ProfileCard
                      name="Rafael Romelo G."
                      title="Fullstack Developer"
                      status="Available for opportunities"
                      contactText="Get In Touch"
                      avatarUrl="muka.JPG"
                      showUserInfo={false}
                      enableTilt={true}
                      onContactClick={() => scrollToSection(contactRef)}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section
            ref={aboutRef}
            id="about"
            className="min-h-screen flex items-center p-8 bg-gray-50 border-b border-gray-200"
          >
            <AboutSection />
          </section>

          {/* Projects Section */}
          <section
            ref={projectsRef}
            id="projects"
            className="min-h-screen flex items-center p-8 bg-white border-b border-gray-200"
          >
            <ProjectsSection />
          </section>

          {/* Skills Section */}
          <section
            ref={skillsRef}
            id="skills"
            className="min-h-screen flex items-center p-8 bg-gray-50 border-b border-gray-200"
          >
            <SkillsSection />
          </section>

          {/* Contact Section */}
          <section
            ref={contactRef}
            id="contact"
            className="min-h-screen flex items-center p-8 pb-24 bg-white"
          >
            <div className="w-full max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm"
              >
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  Let's Connect
                </h2>
                <p className="mb-8 text-gray-600 font-light text-lg">
                  Ready to bring your ideas to life? Let's collaborate and create something amazing together!
                </p>

                {/* Social Media Links */}
                <ul className="flex justify-center mt-5 space-x-6">
                  <li>
                    <a
                      href="https://www.instagram.com/rafael_romelo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fillRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Sull1van-bit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/rafael-romelo-615657289/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-xl p-3 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-5 h-5 text-gray-700" />
            ) : (
              <FaBars className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-white/95 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.2, type: 'tween' }}
                  className="absolute right-0 top-0 h-full w-72 bg-white border-l border-gray-200 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col items-center justify-center h-full space-y-6 p-8">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={item.onClick}
                        className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer px-6 py-3 rounded-lg hover:bg-gray-100 w-full"
                      >
                        <div>{item.icon}</div>
                        <span className="text-lg font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Dock Navigation */}
        <div className="hidden md:block fixed bottom-0 left-0 right-0 z-50">
          <Dock
            items={navItems}
            className="bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-lg"
            panelHeight={50}
            baseItemSize={50}
            magnification={65}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
