import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from './components/ProfileCard';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { Dock } from './components/Dock';
import Beams from './components/Beams';
import StarBorder from './components/StarBorder';

// Icons for the dock and mobile menu
import { FaHome, FaUser, FaBriefcase, FaCode, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

// Declare AOS for TypeScript
declare global {
  interface Window {
    AOS: {
      init: (options?: any) => void;
      refresh: () => void;
    };
  }
}

function App() {
  // Define refs for scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize AOS
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }, []);

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Navigation items
  const navItems = [
    { icon: <FaHome className="w-6 h-6 text-[#32E0C4]" />, label: "Home", onClick: () => scrollToSection(homeRef) },
    { icon: <FaUser className="w-6 h-6 text-[#32E0C4]" />, label: "About", onClick: () => scrollToSection(aboutRef) },
    { icon: <FaBriefcase className="w-6 h-6 text-[#32E0C4]" />, label: "Projects", onClick: () => scrollToSection(projectsRef) },
    { icon: <FaCode className="w-6 h-6 text-[#32E0C4]" />, label: "Skills", onClick: () => scrollToSection(skillsRef) },
    { icon: <FaEnvelope className="w-6 h-6 text-[#32E0C4]" />, label: "Contact", onClick: () => scrollToSection(contactRef) }
  ];

  return (
    // NOTE: Changed overflow-hidden to overflow-x-hidden so vertical scrolling works on mobile.
    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] text-[#EEEEEE] min-h-screen relative overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]"></div>
        <div 
          className="absolute inset-0 animate-pulse opacity-60"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #32E0C4 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-[#32E0C4] to-[#0D7377] rounded-full blur-3xl opacity-40 animate-bounce"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-r from-[#8A2BE2] to-[#32E0C4] rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-[#FF6B6B] to-[#32E0C4] rounded-full blur-2xl opacity-45 animate-spin"></div>
        
        {/* Additional background orbs for more visibility */}
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-[#32E0C4] to-[#8A2BE2] rounded-full blur-2xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-gradient-to-r from-[#8A2BE2] to-[#FF6B6B] rounded-full blur-3xl opacity-35 animate-pulse"></div>
        
        <Beams 
          beamWidth={2}
          beamHeight={25}
          beamNumber={12}
          lightColor="#32E0C4"
          speed={3}
          noiseIntensity={1.5}
          scale={0.2}
          rotation={20}
        />
      </div>
      
      {/* Scanline effect */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#32E0C4]/15 to-transparent h-8 animate-bounce"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        {/* Single column layout with all sections */}
        <div className="min-h-screen">{/* ... existing content ... */}          {/* Home/Hero Section with ProfileCard beside text */}
        <section 
          ref={homeRef} 
          id="home" 
          className="min-h-screen flex flex-col justify-center p-8 bg-gradient-to-br from-[#0a0a0a]/60 via-[#1a1a2e]/40 to-transparent backdrop-blur-md border-t border-[#32E0C4]/30"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-end gap-8 md:gap-20">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-2/5 md:ml-auto text-center md:text-left px-4 md:px-0"
              >
                <div className="relative">
                  {/* Glitch effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#32E0C4]/20 to-[#8A2BE2]/20 blur-xl rounded-lg animate-pulse"></div>
                  
                  <h1 className="relative text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[#32E0C4] via-[#8A2BE2] to-[#32E0C4] bg-clip-text text-transparent animate-pulse">
                    Hi, I'm <span className="bg-gradient-to-r from-[#EEEEEE] to-[#32E0C4] bg-clip-text text-transparent">Rafael</span>
                  </h1>
                </div>
                
                <p className="text-xl md:text-2xl mb-8 text-[#EEEEEE] font-light tracking-wide">
                  <span className="inline-block animate-pulse"></span>Frontend Developer crafting exceptional digital experiences with 
                  <span className="text-[#32E0C4] font-semibold"><br></br>modern web technologies</span>
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <StarBorder
                    onClick={() => scrollToSection(aboutRef)}
                    color="#32E0C4"
                    speed="4s"
                    variant="primary"
                  >
                    About Me
                  </StarBorder>
                  <StarBorder
                    onClick={() => scrollToSection(projectsRef)}
                    color="#8A2BE2"
                    speed="4s"
                    variant="secondary"
                  >
                    Projects
                  </StarBorder>
                </div>
              </motion.div>
              
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:w-2/5 flex justify-start md:justify-end px-4 md:px-0"
              >
                <div className="w-full max-w-sm relative">
                  {/* Holographic border effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#32E0C4] via-[#8A2BE2] to-[#32E0C4] rounded-xl blur opacity-75 animate-pulse"></div>
                  
                  <div className="relative">
                    <ProfileCard
                      name="Rafael Romelo G."
                      title="Frontend Developer"
                      status="Available for opportunities"
                      contactText="Get In Touch"
                      avatarUrl="muka.png"
                      iconUrl="favicon.svg"
                      showUserInfo={false}
                      enableTilt={true}
                      onContactClick={() => scrollToSection(contactRef)}
                      behindGradient={`
                        radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), 
                          hsla(173,100%,90%,var(--card-opacity)) 4%,
                          hsla(280,100%,80%,calc(var(--card-opacity)*0.75)) 10%,
                          hsla(173,50%,70%,calc(var(--card-opacity)*0.5)) 30%,
                          hsla(280,50%,60%,calc(var(--card-opacity)*0.3)) 50%,
                          hsla(173,0%,60%,0) 100%
                        ),
                        conic-gradient(from 0deg at 50% 50%, 
                          #32E0C4ff 0%, 
                          #8A2BE2ff 25%, 
                          #FF6B6Bff 50%, 
                          #32E0C4ff 75%, 
                          #8A2BE2ff 100%
                        ),
                        radial-gradient(ellipse 100% 100% at 50% 50%, 
                          #32E0C4aa 1%, 
                          transparent 50%
                        )
                      `}
                      innerGradient={`
                        linear-gradient(145deg, 
                          #0a0a0a 0%, 
                          #1a1a2e 30%, 
                          #16213e 60%, 
                          #32E0C4/20 100%
                        )
                      `}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
          
          {/* About Section */}
          <section 
            ref={aboutRef} 
            id="about" 
            className="min-h-screen flex items-center p-8 bg-gradient-to-br from-[#1a1a2e]/40 via-[#16213e]/30 to-transparent backdrop-blur-md border-y border-[#32E0C4]/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#32E0C4]/10 to-transparent"></div>
            <AboutSection />
          </section>
          
          {/* Projects Section */}
          <section 
            ref={projectsRef} 
            id="projects" 
            className="min-h-screen flex items-center p-8 bg-gradient-to-br from-[#8A2BE2]/15 via-[#1a1a2e]/40 to-[#16213e]/30 backdrop-blur-md border-y border-[#8A2BE2]/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8A2BE2]/10 to-transparent"></div>
            <ProjectsSection />
          </section>
          
          {/* Skills Section */}
          <section 
            ref={skillsRef} 
            id="skills" 
            className="min-h-screen flex items-center p-8 bg-gradient-to-br from-[#16213e]/40 via-[#1a1a2e]/30 to-transparent backdrop-blur-md border-y border-[#32E0C4]/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#32E0C4]/10 to-transparent"></div>
            <SkillsSection />
          </section>
          
          {/* Contact Section */}
          <section 
            ref={contactRef} 
            id="contact" 
            className="min-h-screen flex items-center p-8 pb-24 bg-gradient-to-br from-[#0a0a0a]/60 via-[#1a1a2e]/40 to-[#16213e]/30 backdrop-blur-md border-t border-[#32E0C4]/30"
          >
            <div 
              className="w-full max-w-2xl mx-auto relative"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              {/* Holographic effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#32E0C4]/20 via-[#8A2BE2]/20 to-[#32E0C4]/20 rounded-xl blur-xl animate-pulse"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/60 p-8 rounded-xl border border-[#32E0C4]/30 backdrop-blur-lg"
              >
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#32E0C4] to-[#8A2BE2] bg-clip-text text-transparent">
                  Let's Connect
                </h2>
                <p className="mb-8 text-[#EEEEEE] font-light">
                  Ready to bring your ideas to life? Let's collaborate and create something amazing together!
                </p>
                
                {/* Social Media Links */}
                <ul className="flex justify-center mt-5 space-x-5">
                  <li>
                    <a 
                      href="https://www.instagram.com/rafael_romelo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#32E0C4]/70 hover:text-[#32E0C4] transition-colors duration-300"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                        <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fillRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/Sull1van-bit" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#32E0C4]/70 hover:text-[#32E0C4] transition-colors duration-300"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                        <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.linkedin.com/in/rafael-romelo-615657289/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#32E0C4]/70 hover:text-[#32E0C4] transition-colors duration-300"
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
          className="fixed top-4 right-4 z-50 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#32E0C4]/50 rounded-xl p-3 cursor-pointer backdrop-blur-lg shadow-lg shadow-[#32E0C4]/20 hover:border-[#32E0C4] transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6 text-[#32E0C4]" />
          ) : (
            <FaBars className="w-6 h-6 text-[#32E0C4]" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-[#0a0a0a]/95 via-[#1a1a2e]/90 to-[#16213e]/95 backdrop-blur-xl z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, type: 'tween' }}
                className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] border-l-2 border-[#32E0C4]/50 shadow-2xl shadow-[#32E0C4]/20 backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#32E0C4] via-[#8A2BE2] to-[#32E0C4] animate-pulse"></div>
                  
                  {navItems.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={item.onClick}
                      className="flex items-center space-x-4 text-[#EEEEEE] hover:text-[#32E0C4] transition-all duration-300 cursor-pointer group bg-gradient-to-r from-transparent to-[#32E0C4]/10 hover:from-[#32E0C4]/20 hover:to-[#8A2BE2]/20 px-6 py-3 rounded-lg border border-transparent hover:border-[#32E0C4]/30 backdrop-blur-sm"
                    >
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent backdrop-blur-xl"></div>
        <Dock
          items={navItems}
          className="bg-gradient-to-r from-[#1a1a2e]/90 via-[#16213e]/80 to-[#1a1a2e]/90 backdrop-blur-xl border-t-2 border-[#32E0C4]/30 shadow-lg shadow-[#32E0C4]/20"
          panelHeight={50}
          baseItemSize={58}
          magnification={75}
        />
      </div>
      </div>
    </div>
  );
}

export default App;
