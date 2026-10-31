import { useState, useMemo } from 'react';
import { marked } from 'marked';
import { getPostBySlug } from '../../lib/blog';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaCheck, FaCopy } from 'react-icons/fa';

interface BlogPostViewProps {
  slug: string;
  onBack: () => void;
}

export function BlogPostView({ slug, onBack }: BlogPostViewProps) {
  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const [copiedLink, setCopiedLink] = useState(false);

  // Parse markdown into HTML
  const parsedHtml = useMemo(() => {
    if (!post) return '';
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
    return marked.parse(post.content) as string;
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <div className="border border-line bg-[var(--card-bg)] p-12 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">404 Error</p>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-[var(--ink)]">
            Article not found
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
            The article you are looking for with slug "{slug}" does not exist or has been moved.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] px-6 py-3 bg-[var(--invert-bg)] text-[var(--invert-fg)] hover:opacity-85 transition-opacity cursor-pointer"
            >
              <FaArrowLeft className="w-3 h-3" />
              <span>Back to all posts</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-line">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to all blog posts"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] px-3.5 py-2 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>All Articles</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label="Copy article URL"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] px-3.5 py-2 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
        >
          {copiedLink ? (
            <>
              <FaCheck className="w-3 h-3 text-emerald-500" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <FaCopy className="w-3 h-3 text-[var(--muted)]" />
              <span>Share Link</span>
            </>
          )}
        </button>
      </div>

      {/* Article Header */}
      <header className="border border-line bg-[var(--card-bg)] p-6 sm:p-10 mb-10 relative">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>
        <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-line-strong font-mono text-[10px] pointer-events-none select-none">+</div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--muted)] pb-4 border-b border-line">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-3 h-3 text-[var(--ink)]" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <FaClock className="w-3 h-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-[var(--ink)] leading-tight">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed pt-1">
              {post.description}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border border-line text-[var(--ink)] bg-[var(--bg)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Article Body */}
      <div
        className="blog-prose border border-line bg-[var(--card-bg)] p-6 sm:p-12 text-[var(--ink)]"
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />

      {/* Article Footer */}
      <footer className="mt-10 p-6 sm:p-8 border border-line bg-[var(--card-bg)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left space-y-1">
          <p className="font-mono text-xs font-semibold text-[var(--ink)] uppercase tracking-wider">
            Rafael Romelo Gibran
          </p>
          <p className="text-xs text-[var(--muted)]">
            Software Engineer / Informatics student at Universitas Multimedia Nusantara
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="font-mono text-xs font-bold uppercase tracking-[0.14em] px-6 py-3 bg-[var(--invert-bg)] text-[var(--invert-fg)] hover:opacity-85 transition-opacity cursor-pointer shrink-0"
        >
          Back to all articles
        </button>
      </footer>
    </article>
  );
}
