import { motion } from 'framer-motion';

export function SkillsSection() {
  const skills = {
    "Frontend Development": [
      { name: "React JS", level: 100 },
      { name: "Next JS", level: 100 },
      { name: "Kotlin", level: 90 },
      { name: "React Native", level: 80 },
      { name: "Vue JS", level: 70 }
    ],
    "Backend & Database": [
     { name : "Node JS", level: 100},
     { name: "Express JS", level: 100},
     { name: "MySQL", level: 100},
     { name: "Python", level: 90},
     { name: "FastAPI", level: 90},
     { name: "Golang", level: 85},
     { name: "MongoDB", level: 80},
     { name: "C/C++", level: 60},
    ],
    "Development Tools": [
      { name: "Git", level: 100},
      { name: "Postman", level: 100},
      { name: "NPM/PNPM", level: 100},
      { name: "N8N", level: 80},
    ],
    "DevOps": [
      { name: "Docker", level: 80},
      { name: "Kubernetes", level: 60},
      { name: "AWS", level: 70},
      { name: "GCP", level: 70},
    ]
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-10 text-gray-900">Technical Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-5 text-gray-900">{category}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                  >
                    <div className="flex justify-between mb-1.5">
                      <span className="text-gray-700 text-sm">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Certifications</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-1 text-gray-900">Full Stack Web Development Bootcamp</h4>
              <p className="text-gray-500">Udemy</p>
            </motion.div>
            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-1 text-gray-900">Finalist At Garuda Hacks 6.0</h4>
              <p className="text-gray-500">Garuda Hacks</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
