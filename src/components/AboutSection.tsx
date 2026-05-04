import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-900">About Me</h2>

        <div className="space-y-6 text-gray-600">
          <p className="text-lg leading-relaxed">
            I am a Computer Science student with a strong foundation in software engineering and a passion for building innovative solutions. I specialize in full-stack development, with hands-on experience in creating web applications through various projects and freelancing opportunities.
          </p>

          <p className="text-lg leading-relaxed">
            Currently, I am expanding my expertise into Machine Learning and AI, eager to apply my technical skills to real-world challenges in this domain. I am seeking a dynamic environment where I can contribute to meaningful projects while continuously developing my skills in data science and artificial intelligence.
          </p>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Experience</h3>

            <div className="space-y-8">
              <div className="border-l-2 border-gray-300 pl-6">
                <h4 className="text-xl font-medium text-gray-900">Fullstack Developer</h4>
                <p className="text-gray-500 mt-1">Fortius Esports • March 2026 - Present</p>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Developed Fortinews, a centralized news platform for the Fortius community to access real-time updates, tournament schedules, and exclusive articles. Engineered both the frontend and backend architecture to ensure a seamless reading experience across all devices.
                </p>
              </div>

              <div className="border-l-2 border-gray-300 pl-6">
                <h4 className="text-xl font-medium text-gray-900">Head of Finance</h4>
                <p className="text-gray-500 mt-1">Himpunan Mahasiswa Informatika (HMIF) UMN • September 2025 - Present</p>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Lead the finance team in managing the association's budget, ensuring financial stability and growth.
                </p>
              </div>

              <div className="border-l-2 border-gray-300 pl-6">
                <h4 className="text-xl font-medium text-gray-900">Head of Competition Division</h4>
                <p className="text-gray-500 mt-1">Universitas Multimedia Nusantara Programming Club (UMNPC) • September 2025 - Present</p>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Created and organized internal competitive programming competitions problems and Rules.
                </p>
              </div>

              <div className="border-l-2 border-gray-300 pl-6">
                <h4 className="text-xl font-medium text-gray-900">Public Relations Officer</h4>
                <p className="text-gray-500 mt-1">Himpunan Mahasiswa Informatika (HMIF) UMN • December 2024 - December 2025</p>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Lead social media strategy and content creation, driving engagement and brand awareness for the Computer Science Student Association at UMN.
                </p>
              </div>

              <div className="border-l-2 border-gray-300 pl-6">
                <h4 className="text-xl font-medium text-gray-900">Frontend Developer</h4>
                <p className="text-gray-500 mt-1">Radioactive UMN • April 2025 - November 2025</p>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Developed dynamic web applications for awarding night and podcast competitions using React and Tailwind CSS, delivering responsive and engaging user experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Education</h3>

            <div className="border-l-2 border-gray-300 pl-6">
              <h4 className="text-xl font-medium text-gray-900">Bachelor of Computer Science</h4>
              <p className="text-gray-500 mt-1">Universitas Multimedia Nusantara • 2024 - 2028</p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Currently pursuing a comprehensive education in computer science with a focus on machine learning, blockchain, and web development.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
