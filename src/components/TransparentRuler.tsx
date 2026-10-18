import { useEffect, useState, useRef, useCallback } from 'react';

interface TransparentRulerProps {
  activeSection: string;
}

interface SectionItem {
  id: string;
  label: string;
}

const ALL_SECTIONS: SectionItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
];

const SECTION_DISPLAY_NAMES: Record<string, string> = {
  home: 'HOME',
  about: 'ABOUT',
  projects: 'PROJECTS',
  skills: 'SKILLS',
  contact: 'CONTACT',
};

export function TransparentRuler({ activeSection }: TransparentRulerProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLSpanElement[]>([]);

  const calculateScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      setScrollProgress(0);
      return;
    }
    const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    calculateScroll();
    window.addEventListener('scroll', calculateScroll, { passive: true });
    window.addEventListener('resize', calculateScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', calculateScroll);
      window.removeEventListener('resize', calculateScroll);
    };
  }, [calculateScroll]);

  const pct = Math.min(Math.max(Math.round(scrollProgress * 100), 0), 100);
  const digitHundreds = Math.floor(pct / 100);
  const digitTens = Math.floor((pct % 100) / 10);
  const digitOnes = pct % 10;

  useEffect(() => {
    const list = [digitHundreds, digitTens, digitOnes];
    list.forEach((d, idx) => {
      const el = digitsRef.current[idx];
      if (el) {
        el.style.transform = `translateY(-${d}em)`;
      }
    });
  }, [digitHundreds, digitTens, digitOnes]);

  const updateScrollFromClientY = (clientY: number, smooth: boolean = false) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const edgePad = 24;
    const usableHeight = rect.height - 2 * edgePad;
    if (usableHeight <= 0) return;

    const relativeY = clientY - rect.top - edgePad;
    const ratio = Math.min(Math.max(relativeY / usableHeight, 0), 1);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: ratio * maxScroll,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateScrollFromClientY(e.clientY, false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateScrollFromClientY(e.clientY, false);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      void 0;
    }
  };

  const scrollToSection = (id: string) => {
    if (id === 'top' || id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentIndex = ALL_SECTIONS.findIndex((s) => s.id === activeSection);
  const upcomingSections =
    currentIndex >= 0 && currentIndex < ALL_SECTIONS.length - 1
      ? ALL_SECTIONS.slice(currentIndex + 1)
      : [{ id: 'home', label: 'TOP' }];

  const activeTitle = SECTION_DISPLAY_NAMES[activeSection] || 'HOME';

  const isAtTop = scrollProgress < 0.02 || pct <= 1;

  return (
    <aside
      className="hidden md:flex fixed top-12 bottom-0 right-0 z-40 flex-row items-stretch select-none pointer-events-auto"
      aria-label="Precision scroll ruler navigation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-5 right-20 sm:right-24 text-right pointer-events-none select-none">
        <div className="font-mono text-[8px] uppercase tracking-[0.24em] text-[var(--muted)] opacity-50">
          PORTFOLIO
        </div>
        <div className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[var(--ink)] mt-0.5">
          {activeTitle}
        </div>
      </div>

      <div className="absolute bottom-6 right-20 sm:right-24 text-right flex flex-col gap-1 pointer-events-auto select-none">
        {upcomingSections.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollToSection(sec.id)}
            className="flex items-center justify-end min-h-[24px] px-1 font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--muted)] opacity-40 hover:opacity-100 hover:text-[var(--ink)] transition-all cursor-pointer text-right w-full"
          >
            {sec.label}
          </button>
        ))}
      </div>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="scrollbar"
        aria-controls="main"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-orientation="vertical"
        className="relative h-full w-8 transition-colors cursor-ns-resize"
      >
        <div className="absolute inset-x-0 top-6 bottom-6 pr-1 pointer-events-none">
          {Array.from({ length: 41 }).map((_, i) => {
            const tickPct = (i / 40) * 100;
            const isMajor = i % 4 === 0;
            const isMedium = i % 2 === 0 && !isMajor;

            return (
              <div
                key={i}
                className="absolute right-0 flex items-center justify-end"
                style={{
                  top: `${(i / 40) * 100}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                {isMajor && (
                  <span
                    className={`font-mono text-[7px] tracking-tight mr-1 transition-opacity ${
                      isHovered || isDragging
                        ? 'text-[var(--ink)] opacity-75'
                        : 'text-[var(--muted)] opacity-35'
                    }`}
                  >
                    {Math.round(tickPct).toString().padStart(2, '0')}
                  </span>
                )}
                <div
                  className={`transition-all duration-150 ${
                    isMajor
                      ? 'w-2.5 h-[1px] bg-[var(--ink)] opacity-70'
                      : isMedium
                      ? 'w-1.5 h-[1px] bg-[var(--muted)] opacity-40'
                      : 'w-1 h-[1px] bg-[var(--muted)] opacity-20'
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div
          className="absolute right-0 pointer-events-none transform -translate-y-1/2 flex items-center justify-end"
          style={{
            top: `calc(24px + ${scrollProgress} * (100% - 48px))`,
          }}
        >
          <div className="flex items-center gap-1.5 pr-0">
            <span
              className={`font-mono text-[9px] font-bold text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.7)] flex items-center transition-all duration-200 ${
                isAtTop ? 'opacity-0 pointer-events-none -translate-x-1.5' : 'opacity-100 translate-x-0'
              }`}
            >
              <span className="ruler-digits">
                {[0, 1, 2].map((colIdx) => (
                  <span
                    key={colIdx}
                    ref={(el) => {
                      if (el) digitsRef.current[colIdx] = el;
                    }}
                    className="ruler-digit-col"
                  >
                    {'0123456789'.split('').map((char) => (
                      <span key={char}>{char}</span>
                    ))}
                  </span>
                ))}
              </span>
              <span className="text-[8px] ml-0.5">%</span>
            </span>

            <div
              className={`w-14 sm:w-16 h-[1.5px] bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.85)] transition-opacity duration-200 ${
                isAtTop ? 'opacity-30' : 'opacity-100'
              }`}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default TransparentRuler;
