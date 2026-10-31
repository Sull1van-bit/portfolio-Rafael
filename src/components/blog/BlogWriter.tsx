import { useState, useEffect, useMemo, useRef } from 'react';
import { marked } from 'marked';
import {
  FaArrowLeft,
  FaDownload,
  FaCopy,
  FaCheck,
  FaHeading,
  FaBold,
  FaCode,
  FaQuoteRight,
  FaListUl,
  FaLink,
  FaExternalLinkAlt,
  FaTrash
} from 'react-icons/fa';

interface BlogWriterProps {
  onBack: () => void;
}

const STORAGE_KEY = 'rafael_blog_writer_draft';

export function BlogWriter({ onBack }: BlogWriterProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugCustom, setIsSlugCustom] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [tags, setTags] = useState('TypeScript, Backend');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState<'split' | 'edit' | 'preview'>('split');
  const [copied, setCopied] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-slugify title if slug has not been manually edited
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isSlugCustom) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  };

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.slug) {
          setSlug(parsed.slug);
          setIsSlugCustom(true);
        }
        if (parsed.date) setDate(parsed.date);
        if (parsed.tags) setTags(parsed.tags);
        if (parsed.description) setDescription(parsed.description);
        if (parsed.content) setContent(parsed.content);
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  // Auto-save draft to localStorage
  useEffect(() => {
    try {
      const draft = { title, slug, date, tags, description, content };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setSavedNotification(true);
      const timer = setTimeout(() => setSavedNotification(false), 1500);
      return () => clearTimeout(timer);
    } catch {
      // Ignore storage save errors
    }
  }, [title, slug, date, tags, description, content]);

  // Generate full markdown with YAML frontmatter
  const fullMarkdown = useMemo(() => {
    const tagArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const formattedTags = tagArray.map((t) => `"${t}"`).join(', ');

    return `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug || 'my-article'}"
date: "${date}"
description: "${description.replace(/"/g, '\\"')}"
tags: [${formattedTags}]
---

${content}`;
  }, [title, slug, date, tags, description, content]);

  // Parse preview HTML
  const previewHtml = useMemo(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
    return marked.parse(content || '*Start typing in the editor to see your live preview here...*') as string;
  }, [content]);

  // Statistics
  const stats = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(1, Math.ceil(words / 200));
    return { words, readingMinutes };
  }, [content]);

  // Helper to insert formatting at cursor
  const insertFormatting = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultPlaceholder;
    const newContent =
      content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const filename = `${slug || 'untitled-post'}.md`;
    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearDraft = () => {
    if (window.confirm('Are you sure you want to clear your current draft?')) {
      setTitle('');
      setSlug('');
      setIsSlugCustom(false);
      setDescription('');
      setContent('');
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Header & Actions */}
      <div className="border border-line bg-[var(--card-bg)] p-4 sm:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to blog"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] px-3 py-2 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
            >
              <FaArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 bg-[var(--invert-bg)] text-[var(--invert-fg)]">
                STUDIO
              </span>
              <span className="font-mono text-xs text-[var(--muted)]">
                Markdown Writer
              </span>
            </div>
            {savedNotification && (
              <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-wider hidden sm:inline">
                Draft auto-saved
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadFile}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] px-4 py-2.5 bg-[var(--invert-bg)] text-[var(--invert-fg)] hover:opacity-85 transition-opacity cursor-pointer"
            >
              <FaDownload className="w-3 h-3" />
              <span>Download .md</span>
            </button>
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] px-4 py-2.5 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <FaCheck className="w-3 h-3 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <FaCopy className="w-3 h-3 text-[var(--muted)]" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
            <a
              href="/admin/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Decap CMS Admin"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] px-3.5 py-2.5 border border-line text-[var(--ink)] hover:bg-[var(--line)]/10 transition-colors cursor-pointer"
            >
              <span>Decap CMS</span>
              <FaExternalLinkAlt className="w-2.5 h-2.5 text-[var(--muted)]" />
            </a>
            <button
              type="button"
              onClick={handleClearDraft}
              aria-label="Clear current draft"
              className="p-2.5 border border-line text-[var(--muted)] hover:text-rose-400 hover:border-rose-400/40 transition-colors cursor-pointer"
              title="Clear draft"
            >
              <FaTrash className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Article Metadata Form */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 space-y-1">
            <label className="font-mono text-[10px] uppercase text-[var(--muted)] tracking-wider">
              Article Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Architecting Scalable APIs in Node.js"
              className="w-full bg-[var(--bg)] border border-line px-3 py-2 text-xs font-mono text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase text-[var(--muted)] tracking-wider">
              Slug (Filename)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setIsSlugCustom(true);
              }}
              placeholder="e.g. architecting-scalable-apis"
              className="w-full bg-[var(--bg)] border border-line px-3 py-2 text-xs font-mono text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] uppercase text-[var(--muted)] tracking-wider">
              Publish Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[var(--bg)] border border-line px-3 py-2 text-xs font-mono text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
            />
          </div>

          <div className="lg:col-span-2 space-y-1">
            <label className="font-mono text-[10px] uppercase text-[var(--muted)] tracking-wider">
              Description / Excerpt
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the article..."
              className="w-full bg-[var(--bg)] border border-line px-3 py-2 text-xs font-mono text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
            />
          </div>

          <div className="lg:col-span-2 space-y-1">
            <label className="font-mono text-[10px] uppercase text-[var(--muted)] tracking-wider">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="TypeScript, Architecture, Backend"
              className="w-full bg-[var(--bg)] border border-line px-3 py-2 text-xs font-mono text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
            />
          </div>
        </div>
      </div>

      {/* Editor & Preview Workspace */}
      <div className="border border-line bg-[var(--card-bg)]">
        {/* Workspace Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-line bg-[var(--bg)] flex-wrap gap-2">
          {/* Quick formatting buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertFormatting('## ', '', 'Section Heading')}
              aria-label="Insert Heading 2"
              className="p-2 border border-line text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card-bg)] cursor-pointer"
              title="Heading 2"
            >
              <FaHeading className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('**', '**', 'bold text')}
              aria-label="Insert Bold"
              className="p-2 border border-line text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card-bg)] cursor-pointer"
              title="Bold"
            >
              <FaBold className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('```typescript\n', '\n```', '// code here')}
              aria-label="Insert Code Block"
              className="p-2 border border-line text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card-bg)] cursor-pointer"
              title="Code Block"
            >
              <FaCode className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ', '', 'Quoted thought')}
              aria-label="Insert Quote"
              className="p-2 border border-line text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card-bg)] cursor-pointer"
              title="Quote"
            >
              <FaQuoteRight className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('- ', '', 'List item')}
              aria-label="Insert Bullet List"
              className="p-2 border border-line text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card-bg)] cursor-pointer"
              title="List"
            >
              <FaListUl className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('[', '](https://example.com)', 'link label')}
              aria-label="Insert Link"
              className="p-2 border border-line text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card-bg)] cursor-pointer"
              title="Link"
            >
              <FaLink className="w-3 h-3" />
            </button>
          </div>

          {/* Stats and Mode Toggle */}
          <div className="flex items-center gap-4 text-xs font-mono text-[var(--muted)]">
            <div className="flex items-center gap-3">
              <span>{stats.words} words</span>
              <span>~{stats.readingMinutes} min read</span>
            </div>

            {/* View switcher for responsive layout */}
            <div className="flex border border-line">
              <button
                type="button"
                onClick={() => setActiveTab('split')}
                className={`hidden lg:block px-2.5 py-1 text-[10px] uppercase font-mono cursor-pointer ${
                  activeTab === 'split'
                    ? 'bg-[var(--invert-bg)] text-[var(--invert-fg)] font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                Split View
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-2.5 py-1 text-[10px] uppercase font-mono cursor-pointer ${
                  activeTab === 'edit'
                    ? 'bg-[var(--invert-bg)] text-[var(--invert-fg)] font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-2.5 py-1 text-[10px] uppercase font-mono cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-[var(--invert-bg)] text-[var(--invert-fg)] font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                Live Preview
              </button>
            </div>
          </div>
        </div>

        {/* Editor Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-line min-h-[550px]">
          {/* Markdown Input Area */}
          {(activeTab === 'split' || activeTab === 'edit') && (
            <div className="p-4 sm:p-6 flex flex-col h-full">
              <span className="font-mono text-[10px] uppercase text-[var(--muted)] tracking-wider mb-2">
                Markdown Editor
              </span>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article in Markdown here... Use ## for headings, ``` for code blocks, and - for bullet points."
                className="w-full flex-1 min-h-[460px] bg-transparent text-xs sm:text-sm font-mono text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none resize-y leading-relaxed"
                spellCheck={false}
              />
            </div>
          )}

          {/* Rendered Preview Area */}
          {(activeTab === 'split' || activeTab === 'preview') && (
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[700px] bg-[var(--card-bg)]">
              <span className="font-mono text-[10px] uppercase text-[var(--muted)] tracking-wider mb-3 block">
                Rendered Preview
              </span>
              <div className="border border-line p-4 sm:p-6 bg-[var(--bg)]">
                <h1 className="text-2xl sm:text-3xl font-display font-medium text-[var(--ink)] pb-2 mb-4 border-b border-line">
                  {title || 'Article Title'}
                </h1>
                <div
                  className="blog-prose"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
