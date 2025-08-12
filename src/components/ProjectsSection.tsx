import { useState, useEffect, useCallback } from 'react';
import type { ElementType, ReactNode, SyntheticEvent, ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
// You might need to install embla-carousel-react: npm install embla-carousel-react

// --- Type definition for the polymorphic component ---
type StarBorderProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

// A placeholder for your StarBorder component if you want to test this standalone
const StarBorder = <T extends ElementType = 'button'>({ as, children, className, ...props }: StarBorderProps<T>) => {
  const Component = as || 'button';
  return (
    <Component
      {...props as any}
      className={`inline-block px-6 py-3 border-2 border-[#32E0C4] text-[#32E0C4] rounded-full font-bold hover:bg-[#32E0C4] hover:text-[#212121] transition-all duration-300 cursor-pointer ${className || ''}`}
    >
      {children}
    </Component>
  );
};


export function ProjectsSection() {
  const projects = [
    {
      title: "The Forgotten Chronicle",
      description: "An immersive medieval life simulation game featuring exploration, farming mechanics, and interactive mini-games. This project showcases advanced React development and Firebase integration.",
      image: "game.png",
      tags: ["React", "Firebase", "Tailwind CSS"],
      link: "https://the-forgotten-chronicle-git-main-sull1van-bits-projects.vercel.app"
    },
    {
      title: "LeftOver",
      description: "A marketplace to reduce food waste, built for Garuda Hacks 6.0 and selected as a finalist. It features an AI Recipe Finder for consumers to turn leftovers into delicious meals.",
      image: "Logo.png",
      tags: ["React", "AI", "Hackathon", "Sustainability"],
      link: "https://letfover.vercel.app/"
    },
  ];

  // --- Embla Carousel Setup ---
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Explicitly type the state to be an array of numbers
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
        if (emblaApi) {
            emblaApi.off('select', onSelect);
        }
    };
  }, [emblaApi]);
  // --- End Embla Carousel Setup ---


  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
        {/* You can add this style block to your global CSS file */}
        <style>{`
            .embla {
                overflow: hidden;
                /* Allow vertical scroll gestures to bubble (horizontal only carousel) */
                touch-action: pan-y pinch-zoom;
            }
            .embla__container {
                display: flex;
            }
            .embla__slide {
                flex: 0 0 100%;
                min-width: 0;
            }
        `}</style>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#32E0C4] text-center">Featured Projects</h2>
          
          <div className="flex items-center justify-center md:gap-x-4">
             {/* --- Carousel Controls (Prev) --- */}
            <button
                className="hidden md:block bg-[#0D7377]/80 hover:bg-[#32E0C4] text-white hover:text-[#212121] p-3 rounded-full transition-all duration-300 shadow-lg shrink-0 relative z-10 cursor-pointer"
                onClick={scrollPrev}
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            {/* --- Embla Carousel --- */}
            <div className="embla w-full max-w-2xl flex-1 min-w-0">
              <div className="embla__viewport rounded-lg" ref={emblaRef}>
                <div className="embla__container">
                  {projects.map((project, index: number) => (
                    <div className="embla__slide p-2" key={index}>
                      <motion.div
                        className="bg-[#212121] border border-[#0D7377] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#32E0C4]/20 transition-all duration-300 h-full flex flex-col"
                        whileHover={{ y: -5 }}
                      >
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-48 sm:h-56 object-cover"
                          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/212121/FF0000?text=Image+Error'; }}
                        />
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold mb-2 text-[#32E0C4]">{project.title}</h3>
                          <p className="text-[#EEEEEE] mb-4 flex-grow text-sm sm:text-base">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag: string, i: number) => (
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
                            className="inline-flex items-center text-[#32E0C4] hover:text-[#EEEEEE] transition-colors duration-300 mt-auto cursor-pointer"
                          >
                            Explore Project
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* --- End Embla Carousel --- */}
            
            {/* --- Carousel Controls (Next) --- */}
            <button
                className="hidden md:block bg-[#0D7377]/80 hover:bg-[#32E0C4] text-white hover:text-[#212121] p-3 rounded-full transition-all duration-300 shadow-lg shrink-0 relative z-10 cursor-pointer"
                onClick={scrollNext}
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          {/* --- Carousel Dots --- */}
          <div className="flex justify-center gap-2 mt-4 relative z-10">
              {scrollSnaps.map((_, index: number) => (
                  <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                          index === selectedIndex ? 'bg-[#32E0C4] scale-110' : 'bg-[#0D7377]'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                  />
              ))}
          </div>

          <div className="text-center mt-10 relative z-10">
            <StarBorder
              as="a"
              href="https://github.com/Sull1van-bit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discover More Projects
            </StarBorder>
          </div>
        </motion.div>
    </div>
  );
}