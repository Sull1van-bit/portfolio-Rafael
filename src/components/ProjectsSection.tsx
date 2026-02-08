import { useState, useEffect, useCallback } from 'react';
import type { SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

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
      tags: ["React", "AI", "Firebase", "Tailwind CSS"],
      link: "https://letfover.vercel.app/"
    },
    {
      title: "UMN Radioactive 2025 Podcast Competition and Awarding Night Page",
      description: "Website for UMN Radioactive 2025, an annual event hosted by UMN Radio where all students across Indonesia can compete in Radio Announcing, and Podcast Competition.",
      image: "radioactive.png",
      tags: ["React", "Tailwind CSS"],
      link: "https://radioactiveumn2025.com/"
    },
    {
      title: "Energon Bintang Mulia Company Profile",
      description: "Website for Energon Bintang Mulia, a company that provides dental equipment and supplies.",
      image: "energon.png",
      tags: ["React", "Tailwind CSS", "Firebase"],
      link: "https://www.energonbintangmulia.com/"
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <style>{`
            .embla {
                overflow: hidden;
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
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 text-center">Featured Projects</h2>

        <div className="flex items-center justify-center md:gap-x-4">
          {/* Carousel Controls (Prev) */}
          <button
            className="hidden md:block bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full transition-all duration-200 shadow-sm border border-gray-200 shrink-0 relative z-10 cursor-pointer"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          {/* Embla Carousel */}
          <div className="embla w-full max-w-2xl flex-1 min-w-0">
            <div className="embla__viewport rounded-xl" ref={emblaRef}>
              <div className="embla__container">
                {projects.map((project, index: number) => (
                  <div className="embla__slide p-2" key={index}>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 sm:h-56 object-cover"
                        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/f3f4f6/9ca3af?text=Image'; }}
                      />
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                        <p className="text-gray-600 mb-4 flex-grow text-sm sm:text-base leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 mt-auto cursor-pointer font-medium"
                        >
                          Explore Project
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Controls (Next) */}
          <button
            className="hidden md:block bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full transition-all duration-200 shadow-sm border border-gray-200 shrink-0 relative z-10 cursor-pointer"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-6 relative z-10">
          {scrollSnaps.map((_, index: number) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${index === selectedIndex ? 'bg-gray-800 scale-110' : 'bg-gray-300'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-10 relative z-10">
          <a
            href="https://github.com/Sull1van-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-200"
          >
            Discover More Projects
          </a>
        </div>
      </motion.div>
    </div>
  );
}