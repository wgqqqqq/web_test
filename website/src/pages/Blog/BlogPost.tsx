import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { getPostBySlug, tagConfig } from './blogData';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import './BlogPost.scss';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="blog-post blog-post--not-found">
        <div className="blog-post__container">
          <div className="blog-post__error">
            <h1>文章未找到</h1>
            <p>抱歉，您访问的文章不存在。</p>
            <Link to="/blog" className="blog-post__back-link">
              <ArrowLeft size={16} />
              返回博客列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="blog-post">
      <div className="blog-post__container">
        {/* 返回链接 */}
        <Link to="/blog" className="blog-post__back-link">
          <ArrowLeft size={16} />
          返回博客列表
        </Link>

        {/* 文章头部 */}
        <header className="blog-post__header">
          <div className="blog-post__tags">
            {post.tags.map(tag => (
              <span key={tag} className="blog-post__tag">
                {tagConfig[tag].label}
              </span>
            ))}
          </div>

          <h1 className="blog-post__title">{post.title}</h1>

          <div className="blog-post__meta">
            <span className="blog-post__meta-item">
              <User size={16} />
              {post.author}
            </span>
            <span className="blog-post__meta-item">
              <Calendar size={16} />
              {formattedDate}
            </span>
            <span className="blog-post__meta-item">
              <Clock size={16} />
              {post.readTime} 分钟阅读
            </span>
          </div>
        </header>

        {/* 文章内容 */}
        <article className="blog-post__content">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* 文章底部 */}
        <footer className="blog-post__footer">
          <Link to="/blog" className="blog-post__back-link">
            <ArrowLeft size={16} />
            返回博客列表
          </Link>
        </footer>
      </div>
    </div>
  );
}
