
import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-[#32E0C4]">About Me</h2>
        
        <div className="space-y-6 text-[#EEEEEE]">
          <p className="text-lg">
            Hello! I'm a passionate software developer with a strong focus on creating beautiful and functional user experiences. My journey in tech started with a deep curiosity about how digital solutions can solve real-world problems.
          </p>
          
          <p className="text-lg">   
            With expertise in modern frontend technologies like React, TypeScript, and Framer Motion, I build applications that are not only visually appealing but also performant and accessible.
          </p>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#32E0C4]">Experience</h3>
            
            <div className="space-y-6">
              <div className="border-l-2 border-[#0D7377] pl-4">
                <h4 className="text-xl font-medium text-[#EEEEEE]">Senior Frontend Developer</h4>
                <p className="text-[#32E0C4]">Tech Company • 2022 - Present</p>
                <p className="mt-2">
                  Leading frontend development for a SaaS platform with React and TypeScript. Implemented responsive designs and improved performance by 40%.
                </p>
              </div>
              
              <div className="border-l-2 border-[#0D7377] pl-4">
                <h4 className="text-xl font-medium text-[#EEEEEE]">Web Developer</h4>
                <p className="text-[#32E0C4]">Design Studio • 2019 - 2022</p>
                <p className="mt-2">
                  Developed interactive websites for clients across various industries. Collaborated with designers to create pixel-perfect implementations.
                </p>
              </div>
              
              <div className="border-l-2 border-[#0D7377] pl-4">
                <h4 className="text-xl font-medium text-[#EEEEEE]">Frontend Intern</h4>
                <p className="text-[#32E0C4]">Startup • 2018 - 2019</p>
                <p className="mt-2">
                  Assisted in building UI components and implementing designs for a mobile-first web application.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#32E0C4]">Education</h3>
            
            <div className="border-l-2 border-[#0D7377] pl-4">
              <h4 className="text-xl font-medium text-[#EEEEEE]">BSc in Computer Science</h4>
              <p className="text-[#32E0C4]">University Name • 2015 - 2019</p>
              <p className="mt-2">
                Focused on web technologies and software engineering. Graduated with honors.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
