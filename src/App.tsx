import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ProfileCard } from './components/ProfileCard';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { Dock } from './components/Dock';

// Icons for the dock
import { FaHome, FaUser, FaBriefcase, FaCode, FaEnvelope } from 'react-icons/fa';

function App() {
  // Define refs for scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#212121] text-[#EEEEEE] min-h-screen relative">
      {/* Single column layout with all sections */}
      <div className="min-h-screen">
        {/* Home/Hero Section with ProfileCard beside text */}
        <section 
          ref={homeRef} 
          id="home" 
          className="min-h-screen flex flex-col justify-center p-8"
        >
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2"
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#32E0C4]">Hi, I'm <span className="text-[#EEEEEE]">Rafael</span></h1>
                <p className="text-xl md:text-2xl mb-8 text-[#EEEEEE]">Front End Developer specializing in modern web technologies.</p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => scrollToSection(aboutRef)}
                    className="bg-[#32E0C4] hover:bg-[#0D7377] text-[#212121] font-bold py-2 px-6 rounded-full transition duration-300"
                  >
                    About Me
                  </button>
                  <button 
                    onClick={() => scrollToSection(projectsRef)}
                    className="border-2 border-[#32E0C4] text-[#32E0C4] hover:bg-[#32E0C4] hover:text-[#212121] font-bold py-2 px-6 rounded-full transition duration-300"
                  >
                    Projects
                  </button>
                </div>
              </motion.div>
              
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:w-1/2 flex justify-center"
              >
                <div className="w-full max-w-sm">
                  <ProfileCard 
                    avatarUrl="/avatar-placeholder.jpg"
                    name="Rafael"
                    title="Front End Developer"
                    handle="rafael-dev"
                    status="Available for hire"
                    showUserInfo={true}
                    enableTilt={true}
                    onContactClick={() => scrollToSection(contactRef)}
                    behindGradient={`radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(173,100%,90%,var(--card-opacity)) 4%,hsla(173,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(173,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(173,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#32E0C4c4 0%,#0D737700 100%),radial-gradient(100% 100% at 50% 50%,#32E0C4ff 1%,#0D737700 76%),conic-gradient(from 124deg at 50% 50%,#32E0C4ff 0%,#0D7377ff 40%,#0D7377ff 60%,#32E0C4ff 100%)`}
                    innerGradient={`linear-gradient(145deg,#0D73778c 0%,#32E0C444 100%)`}
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
            className="min-h-screen flex items-center p-8 bg-[#212121]/80 backdrop-blur-sm"
          >
            <AboutSection />
          </section>
          
          {/* Projects Section */}
          <section 
            ref={projectsRef} 
            id="projects" 
            className="min-h-screen flex items-center p-8 bg-gradient-to-b from-[#0D7377]/20 to-[#212121]/80"
          >
            <ProjectsSection />
          </section>
          
          {/* Skills Section */}
          <section 
            ref={skillsRef} 
            id="skills" 
            className="min-h-screen flex items-center p-8 bg-[#212121]/80 backdrop-blur-sm"
          >
            <SkillsSection />
          </section>
          
          {/* Contact Section */}
          <section 
            ref={contactRef} 
            id="contact" 
            className="min-h-screen flex items-center p-8 pb-24 bg-gradient-to-b from-[#0D7377]/20 to-[#212121]/90"
          >
            <div className="w-full max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-[#32E0C4]">Contact Me</h2>
                <p className="mb-8 text-[#EEEEEE]">Feel free to reach out if you'd like to collaborate or just say hello!</p>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-[#EEEEEE] mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      className="w-full p-2 rounded bg-[#212121] border border-[#0D7377] focus:border-[#32E0C4] focus:outline-none text-[#EEEEEE]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[#EEEEEE] mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full p-2 rounded bg-[#212121] border border-[#0D7377] focus:border-[#32E0C4] focus:outline-none text-[#EEEEEE]"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[#EEEEEE] mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full p-2 rounded bg-[#212121] border border-[#0D7377] focus:border-[#32E0C4] focus:outline-none text-[#EEEEEE]"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="bg-[#32E0C4] hover:bg-[#0D7377] text-[#212121] font-bold py-2 px-6 rounded-full transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </section>
        </div>

      {/* Dock Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Dock
          items={[
            { icon: <FaHome className="w-6 h-6 text-[#32E0C4]" />, label: "Home", onClick: () => scrollToSection(homeRef) },
            { icon: <FaUser className="w-6 h-6 text-[#32E0C4]" />, label: "About", onClick: () => scrollToSection(aboutRef) },
            { icon: <FaBriefcase className="w-6 h-6 text-[#32E0C4]" />, label: "Projects", onClick: () => scrollToSection(projectsRef) },
            { icon: <FaCode className="w-6 h-6 text-[#32E0C4]" />, label: "Skills", onClick: () => scrollToSection(skillsRef) },
            { icon: <FaEnvelope className="w-6 h-6 text-[#32E0C4]" />, label: "Contact", onClick: () => scrollToSection(contactRef) }
          ]}
          className="bg-[#212121]/80 backdrop-blur-md border-[#0D7377]"
          panelHeight={48}
          baseItemSize={40}
          magnification={56}
        />
      </div>
    </div>
  );
}

export default App;
