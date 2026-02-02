import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts, tagConfig, BlogPost, BlogTag, getFeaturedPosts } from './blogData';
import './Blog.scss';

// 文章卡片组件
function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link to={`/blog/${post.slug}`} className={`post-card ${featured ? 'post-card--featured' : ''}`}>
      <div className="post-card__content">
        <div className="post-card__tags">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="post-card__tag"
            >
              {tagConfig[tag].label}
            </span>
          ))}
        </div>
        
        <h3 className="post-card__title">{post.title}</h3>
        <p className="post-card__excerpt">{post.excerpt}</p>
        
        <div className="post-card__meta">
          <span className="post-card__date">
            <Calendar size={14} />
            {formattedDate}
          </span>
          <span className="post-card__read-time">
            <Clock size={14} />
            {post.readTime} 分钟阅读
          </span>
        </div>
        
        <div className="post-card__footer">
          <span className="post-card__author">{post.author}</span>
          <span className="post-card__link">
            阅读更多
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// 标签筛选组件
function TagFilter({ 
  activeTag, 
  onTagChange 
}: { 
  activeTag: BlogTag | null; 
  onTagChange: (tag: BlogTag | null) => void;
}) {
  const tags = Object.entries(tagConfig) as [BlogTag, { label: string; color: string }][];
  
  return (
    <div className="tag-filter">
      <button 
        className={`tag-filter__btn ${activeTag === null ? 'tag-filter__btn--active' : ''}`}
        onClick={() => onTagChange(null)}
      >
        全部
      </button>
      {tags.map(([key, { label }]) => (
        <button
          key={key}
          className={`tag-filter__btn ${activeTag === key ? 'tag-filter__btn--active' : ''}`}
          onClick={() => onTagChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function Blog() {
  const [activeTag, setActiveTag] = useState<BlogTag | null>(null);
  
  const featuredPosts = getFeaturedPosts();
  const filteredPosts = activeTag 
    ? blogPosts.filter(post => post.tags.includes(activeTag))
    : blogPosts;
  
  // 按日期排序
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="blog">
      <div className="blog__container">
        {/* 页面标题 */}
        <header className="blog__header">
          <h1 className="blog__title">博客</h1>
          <p className="blog__subtitle">
            产品更新、技术分享和社区动态
          </p>
        </header>
        
        {/* 精选文章 */}
        {!activeTag && featuredPosts.length > 0 && (
          <section className="blog__featured">
            <h2 className="blog__section-title">精选文章</h2>
            <div className="blog__featured-grid">
              {featuredPosts.map(post => (
                <PostCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}
        
        {/* 标签筛选 */}
        <div className="blog__filter">
          <TagFilter activeTag={activeTag} onTagChange={setActiveTag} />
        </div>
        
        {/* 文章列表 */}
        <section className="blog__posts">
          <h2 className="blog__section-title">
            {activeTag ? tagConfig[activeTag].label : '全部文章'}
          </h2>
          <div className="blog__posts-grid">
            {sortedPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          
          {sortedPosts.length === 0 && (
            <div className="blog__empty">
              <p>暂无相关文章</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
