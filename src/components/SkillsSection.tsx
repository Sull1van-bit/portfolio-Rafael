
import { motion } from 'framer-motion';

export function SkillsSection() {
  const skills = {
    "Frontend": [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Framer Motion", level: 80 },
    ],
    "Backend": [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "MongoDB", level: 65 },
      { name: "SQL", level: 60 },
      { name: "GraphQL", level: 60 },
    ],
    "Tools": [
      { name: "Git", level: 85 },
      { name: "Webpack", level: 70 },
      { name: "Docker", level: 60 },
      { name: "Figma", level: 75 },
      { name: "VS Code", level: 90 },
    ]
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-[#32E0C4]">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              className="bg-[#212121] border border-[#0D7377] rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-[#32E0C4]">{category}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-[#EEEEEE]">{skill.name}</span>
                      <span className="text-[#32E0C4]">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-[#212121] border border-[#0D7377] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#0D7377] to-[#32E0C4]" 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-[#32E0C4]">Certifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-[#212121] border border-[#0D7377] rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-semibold mb-2 text-[#EEEEEE]">React Advanced Developer</h4>
              <p className="text-[#32E0C4]">Meta • 2022</p>
            </motion.div>
            
            <motion.div
              className="bg-[#212121] border border-[#0D7377] rounded-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-xl font-semibold mb-2 text-[#EEEEEE]">Full Stack Web Developer</h4>
              <p className="text-[#32E0C4]">Udacity • 2021</p>
            </motion.div>
            
            <motion.div
              className="bg-[#212121] border border-[#0D7377] rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-xl font-semibold mb-2 text-[#EEEEEE]">UI/UX Design Fundamentals</h4>
              <p className="text-[#32E0C4]">Google • 2020</p>
            </motion.div>
            
            <motion.div
              className="bg-[#212121] border border-[#0D7377] rounded-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-xl font-semibold mb-2 text-[#EEEEEE]">AWS Cloud Practitioner</h4>
              <p className="text-[#32E0C4]">Amazon Web Services • 2019</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
