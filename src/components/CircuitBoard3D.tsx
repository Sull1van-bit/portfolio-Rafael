import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Point {
  x: number;
  y: number;
}

interface PathDef {
  points: Point[];
  totalLength: number;
  segmentLengths: number[];
  vias: Point[];
}

interface Pulse {
  pathIndex: number;
  distance: number;
  speed: number;
  length: number;
  color: string;
  headGlow: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
}

export function CircuitBoard3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scrollYOffset = useTransform(scrollY, [0, 500], [0, 80]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 40;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 30;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const rawPathTemplates: { yPct: number; segments: { dx: number; dy: number }[]; hasVias?: boolean }[] = [
      {
        yPct: 0.12,
        segments: [
          { dx: 0.22, dy: 0 },
          { dx: 0.04, dy: 0.035 },
          { dx: 0.38, dy: 0 },
          { dx: 0.04, dy: -0.035 },
          { dx: 0.32, dy: 0 },
        ],
        hasVias: true,
      },
      {
        yPct: 0.14,
        segments: [
          { dx: 0.21, dy: 0 },
          { dx: 0.04, dy: 0.035 },
          { dx: 0.36, dy: 0 },
          { dx: 0.04, dy: -0.035 },
          { dx: 0.25, dy: 0 },
        ],
      },
      {
        yPct: 0.22,
        segments: [
          { dx: 0.18, dy: 0 },
          { dx: 0.035, dy: -0.04 },
          { dx: 0.32, dy: 0 },
          { dx: 0.04, dy: 0.04 },
          { dx: 0.28, dy: 0 },
          { dx: 0.03, dy: -0.03 },
          { dx: 0.115, dy: 0 },
        ],
        hasVias: true,
      },
      {
        yPct: 0.29,
        segments: [
          { dx: 0.35, dy: 0 },
          { dx: 0.04, dy: 0.045 },
          { dx: 0.26, dy: 0 },
          { dx: 0.045, dy: -0.045 },
          { dx: 0.3, dy: 0 },
        ],
        hasVias: true,
      },
      {
        yPct: 0.38,
        segments: [
          { dx: 0.15, dy: 0 },
          { dx: 0.035, dy: 0.04 },
          { dx: 0.42, dy: 0 },
          { dx: 0.035, dy: 0.04 },
          { dx: 0.25, dy: 0 },
        ],
      },
      {
        yPct: 0.45,
        segments: [
          { dx: 0.28, dy: 0 },
          { dx: 0.045, dy: -0.05 },
          { dx: 0.22, dy: 0 },
          { dx: 0.04, dy: 0.05 },
          { dx: 0.415, dy: 0 },
        ],
        hasVias: true,
      },
      {
        yPct: 0.47,
        segments: [
          { dx: 0.27, dy: 0 },
          { dx: 0.045, dy: -0.05 },
          { dx: 0.21, dy: 0 },
          { dx: 0.04, dy: 0.05 },
          { dx: 0.35, dy: 0 },
        ],
      },
      {
        yPct: 0.56,
        segments: [
          { dx: 0.12, dy: 0 },
          { dx: 0.04, dy: 0.045 },
          { dx: 0.35, dy: 0 },
          { dx: 0.04, dy: -0.045 },
          { dx: 0.32, dy: 0 },
          { dx: 0.035, dy: 0.035 },
          { dx: 0.09, dy: 0 },
        ],
        hasVias: true,
      },
      {
        yPct: 0.65,
        segments: [
          { dx: 0.32, dy: 0 },
          { dx: 0.04, dy: 0.04 },
          { dx: 0.28, dy: 0 },
          { dx: 0.04, dy: -0.04 },
          { dx: 0.32, dy: 0 },
        ],
        hasVias: true,
      },
      {
        yPct: 0.73,
        segments: [
          { dx: 0.24, dy: 0 },
          { dx: 0.045, dy: -0.04 },
          { dx: 0.34, dy: 0 },
          { dx: 0.045, dy: 0.04 },
          { dx: 0.33, dy: 0 },
        ],
      },
      {
        yPct: 0.75,
        segments: [
          { dx: 0.23, dy: 0 },
          { dx: 0.045, dy: -0.04 },
          { dx: 0.33, dy: 0 },
          { dx: 0.045, dy: 0.04 },
          { dx: 0.25, dy: 0 },
        ],
        hasVias: true,
      },
      {
        yPct: 0.84,
        segments: [
          { dx: 0.16, dy: 0 },
          { dx: 0.04, dy: 0.04 },
          { dx: 0.44, dy: 0 },
          { dx: 0.04, dy: -0.04 },
          { dx: 0.32, dy: 0 },
        ],
        hasVias: true,
      },
      {
        yPct: 0.91,
        segments: [
          { dx: 0.3, dy: 0 },
          { dx: 0.035, dy: -0.035 },
          { dx: 0.35, dy: 0 },
          { dx: 0.035, dy: 0.035 },
          { dx: 0.28, dy: 0 },
        ],
        hasVias: true,
      },
    ];

    let paths: PathDef[] = [];
    let pulses: Pulse[] = [];
    let particles: Particle[] = [];

    const buildGeometry = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      paths = rawPathTemplates.map((tpl) => {
        const pts: Point[] = [];
        let currX = 0;
        let currY = tpl.yPct * height;
        pts.push({ x: currX, y: currY });

        const vias: Point[] = [];
        vias.push({ x: currX, y: currY });

        for (const seg of tpl.segments) {
          currX += seg.dx * width;
          currY += seg.dy * height;
          pts.push({ x: currX, y: currY });
          if (Math.abs(seg.dy) > 0.001 || tpl.hasVias) {
            vias.push({ x: currX, y: currY });
          }
        }
        vias.push({ x: currX, y: currY });

        const segmentLengths: number[] = [];
        let totalLength = 0;
        for (let i = 0; i < pts.length - 1; i++) {
          const dx = pts[i + 1].x - pts[i].x;
          const dy = pts[i + 1].y - pts[i].y;
          const len = Math.hypot(dx, dy);
          segmentLengths.push(len);
          totalLength += len;
        }

        return { points: pts, totalLength, segmentLengths, vias };
      });

      const colors = [
        { color: 'rgba(255, 255, 255, 0.95)', head: '#ffffff' },
        { color: 'rgba(56, 189, 248, 0.95)', head: '#38bdf8' },
        { color: 'rgba(52, 211, 153, 0.95)', head: '#34d399' },
        { color: 'rgba(224, 231, 255, 0.95)', head: '#e0e7ff' },
      ];

      pulses = [];
      paths.forEach((p, pIdx) => {
        const count = pIdx % 2 === 0 ? 2 : 1;
        for (let c = 0; c < count; c++) {
          const col = colors[(pIdx + c) % colors.length];
          pulses.push({
            pathIndex: pIdx,
            distance: (p.totalLength / count) * c + Math.random() * 80,
            speed: 1.2 + Math.random() * 1.6,
            length: 90 + Math.random() * 80,
            color: col.color,
            headGlow: col.head,
          });
        }
      });

      particles = [];
      const particleCount = Math.floor(Math.min(width / 30, 48));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: 1 + Math.random() * 2,
          baseAlpha: 0.15 + Math.random() * 0.45,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    buildGeometry();
    window.addEventListener('resize', buildGeometry);

    const getPointAtDistance = (path: PathDef, dist: number): Point => {
      let remaining = Math.max(0, Math.min(dist, path.totalLength));
      for (let i = 0; i < path.segmentLengths.length; i++) {
        const segLen = path.segmentLengths[i];
        if (remaining <= segLen || i === path.segmentLengths.length - 1) {
          const ratio = segLen === 0 ? 0 : remaining / segLen;
          const p1 = path.points[i];
          const p2 = path.points[i + 1];
          return {
            x: p1.x + (p2.x - p1.x) * ratio,
            y: p1.y + (p2.y - p1.y) * ratio,
          };
        }
        remaining -= segLen;
      }
      return path.points[path.points.length - 1];
    };

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 2);
      lastTime = now;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      ctx.save();
      ctx.translate(mouseRef.current.x, mouseRef.current.y);

      const bgGlowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.7
      );
      if (isDark) {
        bgGlowGrad.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
        bgGlowGrad.addColorStop(0.5, 'rgba(8, 14, 26, 0.25)');
        bgGlowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        bgGlowGrad.addColorStop(0, 'rgba(226, 232, 240, 0.4)');
        bgGlowGrad.addColorStop(1, 'rgba(241, 245, 249, 0)');
      }
      ctx.fillStyle = bgGlowGrad;
      ctx.fillRect(-60, -40, width + 120, height + 80);

      const trackColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)';
      const trackHighlight = isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(14, 165, 233, 0.18)';

      paths.forEach((path, idx) => {
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.strokeStyle = idx % 3 === 0 ? trackHighlight : trackColor;
        ctx.lineWidth = idx % 2 === 0 ? 1.5 : 1;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        for (const via of path.vias) {
          ctx.beginPath();
          ctx.arc(via.x, via.y, 4, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(15, 23, 42, 0.28)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(via.x, via.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 23, 42, 0.4)';
          ctx.fill();
        }
      });

      for (const pulse of pulses) {
        pulse.distance += pulse.speed * dt;
        if (pulse.distance - pulse.length > paths[pulse.pathIndex].totalLength) {
          pulse.distance = 0;
        }

        const path = paths[pulse.pathIndex];
        const headDist = pulse.distance;
        const tailDist = Math.max(0, pulse.distance - pulse.length);

        if (headDist <= 0 || tailDist >= path.totalLength) continue;

        const headPt = getPointAtDistance(path, Math.min(headDist, path.totalLength));
        const tailPt = getPointAtDistance(path, tailDist);

        const pulseGrad = ctx.createLinearGradient(tailPt.x, tailPt.y, headPt.x, headPt.y);
        pulseGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        pulseGrad.addColorStop(0.7, pulse.color);
        pulseGrad.addColorStop(1, '#ffffff');

        ctx.beginPath();
        const steps = 14;
        const stepDist = (Math.min(headDist, path.totalLength) - tailDist) / steps;
        for (let s = 0; s <= steps; s++) {
          const pt = getPointAtDistance(path, tailDist + s * stepDist);
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = pulseGrad;
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(headPt.x, headPt.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = pulse.headGlow;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.pulsePhase += 0.02 * dt;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(224, 242, 254, ${Math.max(0, alpha)})`
          : `rgba(15, 23, 42, ${Math.max(0, alpha * 0.6)})`;
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', buildGeometry);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity: scrollOpacity,
        y: scrollYOffset,
      }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 40%, var(--bg) 95%)',
        }}
      />
    </motion.div>
  );
}

export default CircuitBoard3D;
