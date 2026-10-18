import React from 'react';

interface ProfileCardProps {
  avatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  className?: string;
  onContactClick?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl = 'muka.webp',
  name = 'Rafael Romelo Gibran',
  title = 'Software Engineer',
  className = '',
}) => {
  return (
    <div className="w-full max-w-sm">
      <div
        className={`relative w-full aspect-[0.72] border border-line bg-[var(--card-bg)] shadow-2xl overflow-hidden ${className}`}
      >
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none z-10">+</div>
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none z-10">+</div>
        <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none z-10">+</div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none z-10">+</div>

        <div className="h-9 px-4 border-b border-line flex items-center justify-between bg-[var(--bg)]/80 backdrop-blur-sm">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
            TANGERANG, INDONESIA
          </span>
        </div>

        <div className="relative w-full h-[calc(100%-2.25rem)] overflow-hidden">
          <img
            src={avatarUrl}
            alt={`Portrait of ${name}`}
            width={400}
            height={556}
            fetchPriority="high"
            className="w-full h-full object-cover contrast-[102%]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/400x560/121316/f2f1ee?text=Rafael';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-0 inset-x-0 p-5 border-t border-line/60 bg-[var(--bg)]/85 backdrop-blur-md">
            <p className="font-display text-xl font-bold tracking-tight text-[var(--ink)]">
              {name}
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
