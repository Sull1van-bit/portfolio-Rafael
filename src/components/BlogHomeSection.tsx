import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getAllPosts } from '../lib/blog';
import { FaArrowRight, FaPen, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface BlogHomeSectionProps {
  onSelectPost: (slug: string) => void;
  onViewAll: () => void;
  onOpenWriter: () => void;
}

export function BlogHomeSection({ onSelectPost, onViewAll, onOpenWriter }: BlogHomeSectionProps) {
  const posts = useMemo(() => getAllPosts().slice(0, 3), []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-10 border-b border-line">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 bg-[var(--invert-bg)] text-[var(--invert-fg)]">
              JOURNAL
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              Notes & reading
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-[var(--ink)]">
            Check out <span className="font-serif italic font-normal text-[var(--muted)]">my latest posts.</span>
          </h2>

          <p className="text-[var(--muted)] text-sm sm:text-base max-w-xl leading-relaxed">
            Thoughts on tech, books I read, and things I learn along the way.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenWriter}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] px-4 py-3 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
          >
            <FaPen className="w-3 h-3 text-[var(--muted)]" />
            <span>Write draft</span>
          </button>

          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] px-6 py-3 bg-[var(--invert-bg)] text-[var(--invert-fg)] hover:opacity-85 transition-opacity cursor-pointer"
          >
            <span>View all articles</span>
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      {posts.length === 0 ? (
        <div className="border border-line bg-[var(--card-bg)] p-10 text-center space-y-4">
          <p className="text-sm text-[var(--muted)]">No articles published yet.</p>
          <button
            type="button"
            onClick={onOpenWriter}
            className="font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 bg-[var(--invert-bg)] text-[var(--invert-fg)]"
          >
            Write first post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => onSelectPost(post.slug)}
              tabIndex={0}
              role="button"
              aria-label={`Read article: ${post.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPost(post.slug);
                }
              }}
              className="border border-line bg-[var(--card-bg)] p-6 sm:p-7 flex flex-col justify-between group hover:border-line-strong transition-colors cursor-pointer relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] pb-3 border-b border-line">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="w-3 h-3 text-[var(--ink)]" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaClock className="w-3 h-3" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-display font-medium text-[var(--ink)] group-hover:text-sky-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-line flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-line text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)] group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Read</span>
                  <FaArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Section Footer / Explore More */}
      <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted)]">
        <span>Books, technical notes, and project writeups.</span>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-2 text-[var(--ink)] hover:underline cursor-pointer"
        >
          <span>Explore all posts in archive</span>
          <FaArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>
    </div>
  );
}
