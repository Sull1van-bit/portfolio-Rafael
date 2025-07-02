
import { motion } from 'framer-motion';
import StarBorder from './StarBorder';

export function ProjectsSection() {
  const projects = [
    {
      title: "The Forgotten Chronicle",
      description: "An immersive medieval life simulation game featuring exploration, farming mechanics, and interactive mini-games. Built as part of the Introduction to Internet Technology course, this project showcases advanced React development and Firebase integration.",
      image: "/game.png",
      tags: ["React", "Firebase", "Tailwind CSS"],
      link: "https://heartandcrown.vercel.app"
    },
  ];

  return (
    <div 
      className="w-full max-w-4xl mx-auto"
      data-aos="fade-left"
      data-aos-duration="1000"
      data-aos-delay="200"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-[#32E0C4]">Featured Projects</h2>
        
        <div className="flex justify-center">
          <div className="w-full max-w-md">
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#32E0C4] hover:text-[#EEEEEE] transition-colors duration-300"
                  >
                    Explore Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <StarBorder
            as="a"
            href="https://github.com/Sull1van-bit"
            target="_blank"
            rel="noopener noreferrer"
            color="#32E0C4"
            speed="6s"
            variant="github"
          >
            Discover More Projects
          </StarBorder>
        </div>
      </motion.div>
    </div>
  );
}
