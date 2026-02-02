/**
 * 博客数据配置
 * 
 * 此文件定义博客的类型接口和辅助函数。
 * 实际的博客数据由脚本自动生成（blogData.generated.ts）。
 * 
 * 博客更新流程：
 * 1. 在 src/blog/ 目录下创建或编辑 .md 文件
 * 2. 确保每个文件包含 frontmatter 元数据
 * 3. 运行 npm run blog:sync 同步配置
 * 
 * Frontmatter 格式示例：
 * ---
 * title: 博客标题
 * slug: url-slug
 * excerpt: 摘要
 * date: YYYY-MM-DD
 * author: 作者
 * tags: [tag1, tag2]
 * readTime: 阅读时间
 * featured: 是否精选
 * ---
 */

export type BlogTag = 'announcement' | 'tutorial' | 'engineering' | 'product' | 'community';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: BlogTag[];
  readTime: number;
  featured?: boolean;
}

// 标签配置
export const tagConfig: Record<BlogTag, { label: string }> = {
  announcement: { label: '公告' },
  tutorial: { label: '教程' },
  engineering: { label: '工程' },
  product: { label: '产品' },
  community: { label: '社区' },
};

// 导入自动生成的博客数据
import { generatedBlogPosts } from './blogData.generated';

// 导出博客数据（使用自动生成的数据）
export const blogPosts: BlogPost[] = generatedBlogPosts;

// 获取精选文章
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

// 获取最新文章
export function getLatestPosts(count: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

// 根据标签筛选
export function getPostsByTag(tag: BlogTag): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

// 根据 slug 获取文章
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
