import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getAllPosts } from '../../lib/blog';
import { FaSearch, FaTimes, FaPen, FaCog, FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface BlogListProps {
  onSelectPost: (slug: string) => void;
  onOpenWriter: () => void;
}

export function BlogList({ onSelectPost, onOpenWriter }: BlogListProps) {
  const posts = useMemo(() => getAllPosts(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  // Filter posts by search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query);
      return matchesTag && matchesSearch;
    });
  }, [posts, searchQuery, selectedTag]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header Section */}
      <div className="border border-line bg-[var(--card-bg)] p-6 sm:p-10 relative mb-8">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>
        <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-line">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 bg-[var(--invert-bg)] text-[var(--invert-fg)]">
                JOURNAL
              </span>
              <span className="font-mono text-xs text-[var(--muted)]">
                Articles, books & notes
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-[var(--ink)]">
              Writings, books, <span className="font-serif italic font-normal text-[var(--muted)]">& personal notes.</span>
            </h1>
            <p className="text-[var(--muted)] text-sm sm:text-base max-w-2xl leading-relaxed">
              Notes on software engineering, books I read, and whatever I find interesting along the way.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenWriter}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] px-5 py-3 bg-[var(--invert-bg)] text-[var(--invert-fg)] hover:opacity-85 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--invert-bg)]"
            >
              <FaPen className="w-3 h-3" />
              <span>Write Post</span>
            </button>
            <a
              href="/admin/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Decap CMS Admin Dashboard"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] px-4 py-3 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            >
              <FaCog className="w-3 h-3 text-[var(--muted)]" />
              <span>Decap CMS</span>
            </a>
          </div>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts by topic or title..."
              aria-label="Search blog posts"
              className="w-full bg-[var(--bg)] border border-line pl-9 pr-8 py-2.5 text-xs font-mono text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Tags list */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter posts by tag">
              <span className="font-mono text-[10px] uppercase text-[var(--muted)] mr-1">Tags:</span>
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border transition-colors cursor-pointer ${
                  selectedTag === null
                    ? 'border-[var(--ink)] bg-[var(--invert-bg)] text-[var(--invert-fg)] font-semibold'
                    : 'border-line text-[var(--muted)] hover:text-[var(--ink)] hover:border-line-strong'
                }`}
              >
                All ({posts.length})
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? 'border-[var(--ink)] bg-[var(--invert-bg)] text-[var(--invert-fg)] font-semibold'
                      : 'border-line text-[var(--muted)] hover:text-[var(--ink)] hover:border-line-strong'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Filter Indicator */}
      {(searchQuery || selectedTag) && (
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
            <span>Filtering by:</span>
            {searchQuery && <span className="border border-line px-2 py-0.5 text-[var(--ink)]">"{searchQuery}"</span>}
            {selectedTag && <span className="border border-line px-2 py-0.5 text-[var(--ink)]">Tag: {selectedTag}</span>}
            <span>({filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''})</span>
          </div>
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-mono text-[var(--muted)] hover:text-[var(--ink)] underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Posts List or Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="border border-line bg-[var(--card-bg)] p-12 text-center space-y-4">
          <div className="w-12 h-12 mx-auto border border-line flex items-center justify-center font-mono text-lg text-[var(--muted)]">
            0
          </div>
          <h2 className="text-xl font-display font-medium text-[var(--ink)]">No articles found</h2>
          <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
            No posts matched your current search parameters. Try clearing the search keyword or selecting a different tag.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={clearFilters}
              className="font-mono text-xs font-semibold uppercase tracking-[0.14em] px-6 py-3 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              onClick={() => onSelectPost(post.slug)}
              className="border border-line bg-[var(--card-bg)] p-6 sm:p-8 flex flex-col justify-between group hover:border-line-strong transition-colors cursor-pointer relative"
              tabIndex={0}
              role="button"
              aria-label={`Read article: ${post.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPost(post.slug);
                }
              }}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--muted)] pb-3 border-b border-line">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-3 h-3 text-[var(--ink)]" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaClock className="w-3 h-3" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-display font-medium text-[var(--ink)] group-hover:text-sky-400 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-line flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-line text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      +{post.tags.length - 3}
                    </span>
                  )}
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
    </div>
  );
}
