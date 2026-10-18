import React, { useEffect, useRef } from 'react';
import './CursorGrid.css';

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

export interface CursorGridProps {
  cellSize?: number;
  radius?: number;
  color?: string;
  gridColor?: string;
  gridOpacity?: number;
  spotlight?: number;
  clickPulse?: boolean;
  edgeFade?: number;
  lightMode?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  waveTrigger?: number;
  waveOrigin?: { x: number; y: number };
}

function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(char => char + char).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(56, 189, 248, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const CursorGrid: React.FC<CursorGridProps> = ({
  cellSize = 50,
  radius = 180,
  color = '#38bdf8',
  gridColor = '#334155',
  gridOpacity = 0.12,
  spotlight = 0.45,
  clickPulse = true,
  edgeFade = 0.25,
  className = '',
  children,
  style,
  waveTrigger = 0,
  waveOrigin
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerWaveRef = useRef<((ox?: number, oy?: number) => void) | null>(null);

  useEffect(() => {
    if (waveTrigger > 0) {
      triggerWaveRef.current?.(waveOrigin?.x, waveOrigin?.y);
    }
  }, [waveTrigger, waveOrigin?.x, waveOrigin?.y]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = 0;

    let targetX = -1000;
    let targetY = -1000;
    let curX = -1000;
    let curY = -1000;
    let isInside = false;

    const ripples: Ripple[] = [];

    const triggerWave = (ox?: number, oy?: number) => {
      const originX = ox ?? 32;
      const originY = oy ?? 24;
      const maxDistance = Math.hypot(width || 1200, height || 800) * 1.35;
      ripples.push({
        x: originX,
        y: originY,
        r: 8,
        maxR: maxDistance,
        alpha: 0.95
      });
      setTimeout(() => {
        ripples.push({
          x: originX,
          y: originY,
          r: 4,
          maxR: maxDistance,
          alpha: 0.65
        });
      }, 160);
    };
    triggerWaveRef.current = triggerWave;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!isInside) {
        curX = targetX;
        curY = targetY;
        isInside = true;
      }
    };

    const onPointerLeave = () => {
      isInside = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!clickPulse) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripples.push({
        x,
        y,
        r: 6,
        maxR: radius * 1.6,
        alpha: 0.7
      });
      if (ripples.length > 8) ripples.shift();
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });
    container.addEventListener('pointerdown', onPointerDown, { passive: true });

    let lastTime = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isInside) {
        curX += (targetX - curX) * Math.min(1, dt * 14);
        curY += (targetY - curY) * Math.min(1, dt * 14);
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const radSq = radius * radius;
      const crossSize = Math.max(2, Math.min(4, cellSize * 0.08));

      ctx.lineWidth = 1;

      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;

      const baseGridStroke = hexToRgba(gridColor, gridOpacity);
      ctx.strokeStyle = baseGridStroke;
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        const x = c * cellSize;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r <= rows; r++) {
        const y = r * cellSize;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      if (isInside && curX >= -100 && curX <= width + 100 && curY >= -100 && curY <= height + 100) {
        const spotRadius = radius * 1.25;
        const grad = ctx.createRadialGradient(curX, curY, 0, curX, curY, spotRadius);
        grad.addColorStop(0, hexToRgba(color, spotlight * 0.5));
        grad.addColorStop(0.5, hexToRgba(color, spotlight * 0.18));
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(curX, curY, spotRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = hexToRgba(color, 0.4);
        ctx.beginPath();
        const minCol = Math.max(0, Math.floor((curX - radius) / cellSize));
        const maxCol = Math.min(cols, Math.ceil((curX + radius) / cellSize));
        const minRow = Math.max(0, Math.floor((curY - radius) / cellSize));
        const maxRow = Math.min(rows, Math.ceil((curY + radius) / cellSize));

        for (let c = minCol; c <= maxCol; c++) {
          for (let r = minRow; r <= maxRow; r++) {
            const px = c * cellSize;
            const py = r * cellSize;
            const dx = px - curX;
            const dy = py - curY;
            const distSq = dx * dx + dy * dy;
            if (distSq <= radSq) {
              const falloff = 1 - Math.sqrt(distSq) / radius;
              if (falloff > 0.05) {
                ctx.moveTo(px - crossSize, py);
                ctx.lineTo(px + crossSize, py);
                ctx.moveTo(px, py - crossSize);
                ctx.lineTo(px, py + crossSize);
              }
            }
          }
        }
        ctx.stroke();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += (rip.maxR - rip.r) * Math.min(1, dt * 3.6);
        rip.alpha -= dt * 0.46;

        if (rip.alpha <= 0.01 || rip.r >= rip.maxR - 2) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = hexToRgba(color, Math.max(0, rip.alpha));
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = hexToRgba(color, Math.max(0, rip.alpha * 0.75));
        ctx.lineWidth = 1;
        ctx.beginPath();
        const minC = Math.max(0, Math.floor((rip.x - rip.r - 40) / cellSize));
        const maxC = Math.min(cols, Math.ceil((rip.x + rip.r + 40) / cellSize));
        const minR = Math.max(0, Math.floor((rip.y - rip.r - 40) / cellSize));
        const maxR = Math.min(rows, Math.ceil((rip.y + rip.r + 40) / cellSize));

        for (let c = minC; c <= maxC; c++) {
          for (let r = minR; r <= maxR; r++) {
            const px = c * cellSize;
            const py = r * cellSize;
            const dist = Math.hypot(px - rip.x, py - rip.y);
            const delta = Math.abs(dist - rip.r);
            if (delta < 36) {
              const pulse = (1 - delta / 36) * rip.alpha;
              if (pulse > 0.08) {
                const s = crossSize * (1 + pulse);
                ctx.moveTo(px - s, py);
                ctx.lineTo(px + s, py);
                ctx.moveTo(px, py - s);
                ctx.lineTo(px, py + s);
              }
            }
          }
        }
        ctx.stroke();
      }

      if (edgeFade > 0) {
        ctx.globalCompositeOperation = 'destination-in';

        const fadeX = width * Math.min(0.4, edgeFade);
        const gradX = ctx.createLinearGradient(0, 0, width, 0);
        gradX.addColorStop(0, 'rgba(0,0,0,0)');
        gradX.addColorStop(fadeX / width, 'rgba(0,0,0,1)');
        gradX.addColorStop(1 - fadeX / width, 'rgba(0,0,0,1)');
        gradX.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradX;
        ctx.fillRect(0, 0, width, height);

        const fadeY = height * Math.min(0.4, edgeFade);
        const gradY = ctx.createLinearGradient(0, 0, 0, height);
        gradY.addColorStop(0, 'rgba(0,0,0,0)');
        gradY.addColorStop(fadeY / height, 'rgba(0,0,0,1)');
        gradY.addColorStop(1 - fadeY / height, 'rgba(0,0,0,1)');
        gradY.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradY;
        ctx.fillRect(0, 0, width, height);

        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('pointerdown', onPointerDown);
    };
  }, [cellSize, radius, color, gridColor, gridOpacity, spotlight, clickPulse, edgeFade]);

  return (
    <div
      ref={containerRef}
      className={`cursor-grid-container w-full h-full relative select-none ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="cursor-grid-canvas block w-full h-full" />
      {children && <div className="cursor-grid-content relative z-10 w-full h-full">{children}</div>}
    </div>
  );
};

export default CursorGrid;
