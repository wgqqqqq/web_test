import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getDocBySlug, getAdjacentDocs } from './docsConfig';
import './DocPage.scss';

// 动态导入所有 markdown 文件
const docModules = import.meta.glob('/src/docs/*.md', { 
  query: '?raw',
  import: 'default',
});

/**
 * 移除 Markdown 内容中的 frontmatter
 * frontmatter 是文件开头由 --- 包裹的 YAML 元数据
 */
function removeFrontmatter(content: string): string {
  // 匹配开头的 frontmatter: ---\n...\n---
  const frontmatterRegex = /^---\r?\n[\s\S]*?\r?\n---\r?\n*/;
  return content.replace(frontmatterRegex, '');
}

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const docInfo = slug ? getDocBySlug(slug) : null;
  const { prev, next } = slug ? getAdjacentDocs(slug) : { prev: undefined, next: undefined };

  useEffect(() => {
    async function loadContent() {
      if (!slug) {
        setError('文档不存在');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const modulePath = `/src/docs/${slug}.md`;
      const loader = docModules[modulePath];

      if (!loader) {
        setError('文档不存在或正在编写中');
        setLoading(false);
        return;
      }

      try {
        const rawContent = await loader() as string;
        // 移除 frontmatter 后再设置内容
        const cleanContent = removeFrontmatter(rawContent);
        setContent(cleanContent);
      } catch (err) {
        console.error('Failed to load doc:', err);
        setError('加载文档失败');
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [slug]);

  if (loading) {
    return (
      <div className="doc-page doc-page--loading">
        <div className="doc-page__spinner" />
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doc-page doc-page--error">
        <h1>404</h1>
        <p>{error}</p>
        <Link to="/docs/introduction" className="doc-page__back-link">
          返回文档首页
        </Link>
      </div>
    );
  }

  return (
    <article className="doc-page">
      {/* 文档元信息 */}
      {docInfo && (
        <header className="doc-page__header">
          {docInfo.description && (
            <p className="doc-page__description">{docInfo.description}</p>
          )}
        </header>
      )}

      {/* Markdown 内容 */}
      <div className="doc-page__content">
        <MarkdownRenderer content={content} />
      </div>

      {/* 上一篇 / 下一篇导航 */}
      <nav className="doc-page__nav">
        {prev ? (
          <Link to={`/docs/${prev.slug}`} className="doc-page__nav-link doc-page__nav-link--prev">
            <ChevronLeft size={16} />
            <div>
              <span className="doc-page__nav-label">上一篇</span>
              <span className="doc-page__nav-title">{prev.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}
        
        {next && (
          <Link to={`/docs/${next.slug}`} className="doc-page__nav-link doc-page__nav-link--next">
            <div>
              <span className="doc-page__nav-label">下一篇</span>
              <span className="doc-page__nav-title">{next.title}</span>
            </div>
            <ChevronRight size={16} />
          </Link>
        )}
      </nav>
    </article>
  );
}
