import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroPreloaderProps {
  onComplete?: (dockCoords?: { x: number; y: number }) => void;
}

export function IntroPreloader({ onComplete }: IntroPreloaderProps) {
  const [phase, setPhase] = useState<'loading' | 'docking' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [dockOffset, setDockOffset] = useState({ x: 0, y: 0, scale: 0.18 });
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 850;

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);

        const navIcon = document.getElementById('site-nav-logo-icon') || document.getElementById('site-nav-logo');
        let targetX = 32;
        let targetY = 24;
        let targetScale = 0.18;

        const logoRect = logoRef.current?.getBoundingClientRect();
        const currentCenterX = logoRect ? logoRect.left + logoRect.width / 2 : window.innerWidth / 2;
        const currentCenterY = logoRect ? logoRect.top + logoRect.height / 2 : window.innerHeight / 2;
        const preloaderWidth = logoRect ? logoRect.width : (window.innerWidth >= 640 ? 96 : 80);

        if (navIcon) {
          const rect = navIcon.getBoundingClientRect();
          targetX = rect.left + rect.width / 2;
          targetY = rect.top + rect.height / 2;
          targetScale = Math.max(0.12, Math.min(0.25, rect.width / preloaderWidth));
        }

        const dx = targetX - currentCenterX;
        const dy = targetY - currentCenterY;
        setDockOffset({ x: dx, y: dy, scale: targetScale });

        setTimeout(() => {
          setPhase('docking');
          setTimeout(() => {
            onCompleteRef.current?.({ x: targetX, y: targetY });
            setTimeout(() => {
              setPhase('done');
            }, 80);
          }, 650);
        }, 120);
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro-curtain"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'docking' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg)] select-none pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            ref={logoRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              phase === 'docking'
                ? {
                    x: dockOffset.x,
                    y: dockOffset.y,
                    scale: dockOffset.scale,
                    opacity: 1
                  }
                : {
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1
                  }
            }
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center z-10 origin-center"
          >
            <svg
              className="w-full h-full text-[var(--ink)] drop-shadow-[0_0_25px_rgba(255,255,255,0.18)]"
              viewBox="0 0 512 512"
              fill="none"
            >
              <path
                d="M128 80H288C358.686 80 416 137.314 416 208C416 261.272 383.398 306.918 337.285 326.111L416 432H336L268.421 336H208V432H128V80Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
              <path
                d="M208 152H280C310.928 152 336 177.072 336 208C336 238.928 310.928 264 280 264H208V152Z"
                fill="var(--bg)"
              />
              <path
                d="M384 80L448 144V272L384 208V80Z"
                fill="currentColor"
                opacity="0.4"
              />
              <path
                d="M336 432L400 432L320 336L268 336L336 432Z"
                fill="currentColor"
                opacity="0.6"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'docking' ? 0 : 1, y: phase === 'docking' ? 14 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-2 mt-6 pointer-events-none"
          >
            <div className="w-32 h-[1.5px] bg-[var(--line)] overflow-hidden rounded-full">
              <div
                className="h-full bg-[var(--ink)] transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--muted)]">
              <span>RAFAEL ROMELO</span>
              <span>&middot;</span>
              <span>{Math.round(progress).toString().padStart(2, '0')}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroPreloader;
