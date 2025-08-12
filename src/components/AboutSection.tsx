
import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <div 
      className="w-full max-w-2xl mx-auto"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-[#32E0C4]">About Me</h2>
        
        <div className="space-y-6 text-[#EEEEEE]">
          <p className="text-lg">
            Garuda Hacks 6.0 Finalist and skilled front-end developer with hands-on experience building user interfaces with React and Tailwind CSS.
          </p>
          
          <p className="text-lg">   
            Currently expanding my expertise into Machine Learning and seeking a challenging role where I can contribute my software engineering foundation while developing practical skills in data science and AI.
          </p>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#32E0C4]">Experience</h3>
            
            <div className="space-y-6">
              <div className="border-l-2 border-[#0D7377] pl-4">
                <h4 className="text-xl font-medium text-[#EEEEEE]">Public Relations Officer</h4>
                <p className="text-[#32E0C4]">Himpunan Mahasiswa Informatika (HMIF) UMN • 2024 - Present</p>
                <p className="mt-2">
                  Lead social media strategy and content creation, driving engagement and brand awareness for the Computer Science Student Association at UMN.
                </p>
              </div>
              
              <div className="border-l-2 border-[#0D7377] pl-4">
                <h4 className="text-xl font-medium text-[#EEEEEE]">Frontend Developer</h4>
                <p className="text-[#32E0C4]">Radioactive UMN • 2025 - Present</p>
                <p className="mt-2">
                  Developed dynamic web applications for awarding night and podcast competitions using React and Tailwind CSS, delivering responsive and engaging user experiences.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#32E0C4]">Education</h3>
            
            <div className="border-l-2 border-[#0D7377] pl-4">
              <h4 className="text-xl font-medium text-[#EEEEEE]">Bachelor of Computer Science</h4>
              <p className="text-[#32E0C4]">Universitas Multimedia Nusantara • 2024 - 2028</p>
              <p className="mt-2 text-sm text-[#EEEEEE]/80">
                Currently pursuing a comprehensive education in computer science with a focus on machine learning, blockchain, and web development.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
