import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export function Parallax({
  children,
  baseVelocity: _ = 5, // Ignored but kept for API compatibility
  direction = 'up',
  className = '',
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const isVertical = direction === 'up' || direction === 'down';
  const directionFactor = direction === 'up' || direction === 'left' ? -1 : 1;
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isVertical ? [`${directionFactor * 100}%`, `${-directionFactor * 100}%`] : ['0%', '0%']
  );
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    !isVertical ? [`${directionFactor * 100}%`, `${-directionFactor * 100}%`] : ['0%', '0%']
  );

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x, y }}>{children}</motion.div>
    </div>
  );
}
