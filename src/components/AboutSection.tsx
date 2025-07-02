
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
            Hello! I'm a passionate Front End developer with a strong focus on creating beautiful and functional user experiences. My journey in tech started with a deep curiosity about how digital solutions can solve real-world problems.
          </p>
          
          <p className="text-lg">   
            With expertise in modern frontend technologies like React, Tailwind, and CSS I build applications that are not only visually appealing but also performant and accessible.
          </p>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#32E0C4]">Experience</h3>
            
            <div className="space-y-6">
              <div className="border-l-2 border-[#0D7377] pl-4">
                <h4 className="text-xl font-medium text-[#EEEEEE]">Public Relation</h4>
                <p className="text-[#32E0C4]">Himpunan Mahasiswa Informatika (HMIF) UMN • 2024 - present</p>
                <p className="mt-2">
                  Managing social media accounts and creating engaging content to promote HMIF UMN 
                </p>
              </div>
              
              <div className="border-l-2 border-[#0D7377] pl-4">
                <h4 className="text-xl font-medium text-[#EEEEEE]">Front End Developer</h4>
                <p className="text-[#32E0C4]">Radioactive UMN • 2025 - present</p>
                <p className="mt-2">
                  Developed awarding night and podcast competition page with React, and Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#32E0C4]">Education</h3>
            
            <div className="border-l-2 border-[#0D7377] pl-4">
              <h4 className="text-xl font-medium text-[#EEEEEE]">BSc in Computer Science</h4>
              <p className="text-[#32E0C4]">Universitas Multimedia Nusantara • 2024 - 2028</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
