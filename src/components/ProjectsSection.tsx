
import { motion } from 'framer-motion';

export function ProjectsSection() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with React, TypeScript and Framer Motion.",
      image: "https://placehold.co/600x400/32E0C4/212121?text=Portfolio+Website",
      tags: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "E-commerce Dashboard",
      description: "An admin dashboard for e-commerce platforms with analytics and product management.",
      image: "https://placehold.co/600x400/0D7377/EEEEEE?text=E-commerce+Dashboard",
      tags: ["React", "Redux", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      image: "https://placehold.co/600x400/32E0C4/212121?text=Task+Management+App",
      tags: ["React", "Firebase", "Material UI", "TypeScript"],
      link: "#"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-[#32E0C4]">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-[#212121] border border-[#0D7377] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#32E0C4]/20 transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#32E0C4]">{project.title}</h3>
                <p className="text-[#EEEEEE] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-[#0D7377] text-[#EEEEEE] px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-[#32E0C4] hover:text-[#EEEEEE] transition-colors duration-300"
                >
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-[#0D7377] hover:bg-[#32E0C4] text-[#EEEEEE] hover:text-[#212121] font-bold py-2 px-6 rounded-full transition duration-300"
          >
            View More on GitHub
          </a>
        </div>
      </motion.div>
    </div>
  );
}
