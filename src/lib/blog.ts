export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  content: string;
  readingTime: string;
}

export function parseMarkdownPost(rawText: string, fallbackSlug: string): BlogPost {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(rawText.trim());

  const metadata: Record<string, string | string[]> = {};
  let content = rawText.trim();

  if (match) {
    const yamlBlock = match[1];
    content = match[2].trim();

    for (const line of yamlBlock.split(/\r?\n/)) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        if (value.startsWith('[') && value.endsWith(']')) {
          const items = value
            .slice(1, -1)
            .split(',')
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
            .filter(Boolean);
          metadata[key] = items;
        } else {
          metadata[key] = value;
        }
      }
    }
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  const rawTags = metadata.tags;
  let parsedTags: string[] = [];
  if (Array.isArray(rawTags)) {
    parsedTags = rawTags;
  } else if (typeof rawTags === 'string' && rawTags.length > 0) {
    parsedTags = [rawTags];
  }

  const resolvedSlug = (typeof metadata.slug === 'string' && metadata.slug.length > 0)
    ? metadata.slug
    : fallbackSlug;

  const resolvedTitle = (typeof metadata.title === 'string' && metadata.title.length > 0)
    ? metadata.title
    : fallbackSlug.replace(/[-_]/g, ' ');

  const resolvedDate = typeof metadata.date === 'string'
    ? metadata.date
    : new Date().toISOString().split('T')[0];

  const resolvedDescription = typeof metadata.description === 'string'
    ? metadata.description
    : '';

  const resolvedCoverImage = typeof metadata.coverImage === 'string'
    ? metadata.coverImage
    : undefined;

  return {
    slug: resolvedSlug,
    title: resolvedTitle,
    date: resolvedDate,
    description: resolvedDescription,
    tags: parsedTags,
    coverImage: resolvedCoverImage,
    content,
    readingTime,
  };
}

export function getAllPosts(): BlogPost[] {
  const postFiles = import.meta.glob('/src/content/posts/*.md', {
    query: '?raw',
    eager: true,
  }) as Record<string, { default: string }>;

  const posts: BlogPost[] = [];

  for (const [filePath, fileModule] of Object.entries(postFiles)) {
    const filename = filePath.split('/').pop()?.replace(/\.md$/, '') || 'post';
    const post = parseMarkdownPost(fileModule.default, filename);
    posts.push(post);
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}
