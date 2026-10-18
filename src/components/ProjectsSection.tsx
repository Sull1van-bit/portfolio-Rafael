import { useState, useEffect, useCallback } from 'react';
import type { SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export function ProjectsSection() {
  const projects = [
    {
      code: "PROJECT 01",
      title: "LeftOver",
      year: "2025",
      badge: "Garuda Hacks 6.0 Finalist",
      description: "Web platform built during Garuda Hacks 6.0 to connect surplus food donors with communities in need across Indonesia. Built with React and Firebase, placing as a international finalist among 400+ participants.",
      image: "Logo.webp",
      width: 600,
      height: 600,
      tags: ["React", "Firebase", "Tailwind CSS"],
      link: "https://letfover.vercel.app/"
    },
    {
      code: "PROJECT 02",
      title: "Energon Bintang Mulia",
      year: "2025",
      badge: "Client Project",
      description: "Company website for a dental equipment supplier in Indonesia. Built with React and Tailwind CSS, focusing on fast load times, clear catalog presentation, and search indexing.",
      image: "energon.webp",
      width: 1000,
      height: 562,
      tags: ["React", "Tailwind CSS", "SEO"],
      link: "https://www.energonbintangmulia.com/"
    },
    {
      code: "PROJECT 03",
      title: "The Forgotten Chronicle",
      year: "2025",
      badge: "Web Simulation Game",
      description: "Medieval life simulation web game featuring inventory management, farming loops, and character progression. Uses React with Firebase for data persistence.",
      image: "game.webp",
      width: 1000,
      height: 562,
      tags: ["React", "Firebase", "Tailwind CSS"],
      link: "https://the-forgotten-chronicle-git-main-sull1van-bits-projects.vercel.app"
    },
    {
      code: "PROJECT 04",
      title: "UMN Radioactive 2025",
      year: "2025",
      badge: "Competition Platform",
      description: "Official festival website for UMN Radio's annual competition, handling nationwide participant registration and rulebook delivery for podcast and radio categories.",
      image: "radioactive.webp",
      width: 1000,
      height: 562,
      tags: ["React", "Tailwind CSS"],
      link: "https://radioactiveumn2025.com/"
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 bg-[var(--invert-bg)] text-[var(--invert-fg)]">
                Projects
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
              Selected work &amp; <span className="font-serif italic font-normal text-[var(--muted)]">recent builds.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-mono text-xs text-[var(--muted)] px-3 py-2 border border-line bg-[var(--card-bg)]">
              <span className="text-[var(--ink)] font-semibold">0{selectedIndex + 1}</span>
              <span className="opacity-40 mx-1">/</span>
              <span>0{projects.length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollPrev}
                type="button"
                aria-label="Previous project slide"
                className="w-11 h-11 border border-line bg-[var(--card-bg)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:border-line-strong transition-colors cursor-pointer"
              >
                <FaChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={scrollNext}
                type="button"
                aria-label="Next project slide"
                className="w-11 h-11 border border-line bg-[var(--card-bg)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:border-line-strong transition-colors cursor-pointer"
              >
                <FaChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="flex-[0_0_100%] min-w-0"
              >
                <div className="border border-line bg-[var(--card-bg)] overflow-hidden flex flex-col">
                  <div className="h-10 px-5 border-b border-line flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--muted)] bg-[var(--bg)]/70">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      <span className="text-[var(--ink)] font-semibold">{project.code}</span>
                      <span className="opacity-40">·</span>
                      <span>{project.year}</span>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">{project.badge}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                    <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[380px] w-full overflow-hidden bg-[var(--bg)] border-b md:border-b-0 md:border-r border-line">
                      <img
                        src={project.image}
                        alt={`Preview of project ${project.title}`}
                        width={project.width}
                        height={project.height}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/800x450/121316/f2f1ee?text=Project';
                        }}
                      />
                    </div>

                    <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between gap-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-line text-[var(--muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)]">
                          {project.title}
                        </h3>
                        <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-5 border-t border-line flex items-center justify-between">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] px-4 py-2.5 bg-[var(--invert-bg)] text-[var(--invert-fg)] hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          <span>Open website</span>
                          <FaExternalLinkAlt className="w-2.5 h-2.5" />
                        </a>

                        <a
                          href="https://github.com/Sull1van-bit"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View source repository on GitHub"
                          className="p-2.5 border border-line text-[var(--muted)] hover:text-[var(--ink)] hover:border-line-strong transition-colors cursor-pointer"
                        >
                          <FaGithub className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="w-11 h-11 flex items-center justify-center cursor-pointer"
            >
              <span
                className={`block h-1 transition-all duration-300 ${
                  idx === selectedIndex ? 'w-10 bg-[var(--ink)]' : 'w-3 bg-[var(--line-strong)] hover:bg-[var(--muted)]'
                }`}
              />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}