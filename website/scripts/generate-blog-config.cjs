/**
 * 博客配置自动生成脚本
 * 
 * 功能：
 * 1. 扫描 src/blog 目录下的所有 .md 文件
 * 2. 解析每个文件的 frontmatter 元数据
 * 3. 按日期排序
 * 4. 生成 blogData.generated.ts 文件
 * 
 * 使用方法：
 *   npm run blog:sync
 * 
 * 配置文件：
 *   scripts/content-config.cjs
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 导入统一配置
const config = require('./content-config.cjs');

// 配置
const BLOG_DIR = path.join(__dirname, config.blog.sourceDir);
const OUTPUT_FILE = path.join(__dirname, config.blog.outputFile);

// 有效的标签（从统一配置读取）
const VALID_TAGS = config.blog.tags.map(t => t.id);

/**
 * 扫描博客目录，获取所有 md 文件
 */
function scanBlogDirectory() {
  const files = fs.readdirSync(BLOG_DIR);
  // 根据统一配置排除文件
  return files.filter(file => {
    if (!file.endsWith('.md')) return false;
    return !config.common.excludePatterns.some(pattern => pattern.test(file));
  });
}

/**
 * 解析单个博客的 frontmatter
 */
function parseBlogFile(filename) {
  const filepath = path.join(BLOG_DIR, filename);
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  
  try {
    const { data, content } = matter(fileContent);
    
    // 验证必需字段
    const requiredFields = ['title', 'slug', 'excerpt', 'date', 'author', 'tags', 'readTime'];
    for (const field of requiredFields) {
      if (!data[field]) {
        console.warn(`⚠️  ${filename}: 缺少必需字段 "${field}"`);
        return null;
      }
    }
    
    // 验证标签
    const tags = Array.isArray(data.tags) ? data.tags : [data.tags];
    const validTags = tags.filter(tag => VALID_TAGS.includes(tag));
    if (validTags.length !== tags.length) {
      console.warn(`⚠️  ${filename}: 包含无效标签，有效标签: ${VALID_TAGS.join(', ')}`);
    }
    
    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: content.trim(),
      date: data.date,
      author: data.author,
      tags: validTags,
      readTime: parseInt(data.readTime, 10),
      featured: Boolean(data.featured),
    };
  } catch (error) {
    console.error(`❌ ${filename}: 解析失败 - ${error.message}`);
    return null;
  }
}

/**
 * 生成 TypeScript 配置文件
 */
function generateConfigFile(posts) {
  const timestamp = new Date().toISOString();
  
  // 按日期降序排序
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // 转义内容中的反引号和特殊字符
  const postsCode = posts.map(post => {
    // 处理内容中的反引号
    const escapedContent = post.content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');
    
    return `  {
    slug: '${post.slug}',
    title: '${post.title.replace(/'/g, "\\'")}',
    excerpt: '${post.excerpt.replace(/'/g, "\\'")}',
    content: \`${escapedContent}\`,
    date: '${post.date}',
    author: '${post.author}',
    tags: [${post.tags.map(t => `'${t}'`).join(', ')}],
    readTime: ${post.readTime},
    featured: ${post.featured},
  }`;
  }).join(',\n');
  
  const content = `// 此文件由脚本自动生成，请勿手动修改
// 生成时间: ${timestamp}
// 运行 npm run blog:sync 更新此文件

import type { BlogPost } from './blogData';

export const generatedBlogPosts: BlogPost[] = [
${postsCode}
];
`;
  
  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
}

/**
 * 主函数
 */
function main() {
  console.log('📝 开始扫描博客目录...\n');
  
  // 扫描文件
  const files = scanBlogDirectory();
  console.log(`找到 ${files.length} 个博客文件\n`);
  
  // 解析博客
  const posts = [];
  for (const file of files) {
    const post = parseBlogFile(file);
    if (post) {
      posts.push(post);
      const featuredMark = post.featured ? ' ⭐' : '';
      console.log(`✅ ${file}: ${post.title}${featuredMark}`);
    }
  }
  
  if (posts.length === 0) {
    console.log('\n⚠️  没有找到有效的博客文件');
    return;
  }
  
  // 生成配置文件
  generateConfigFile(posts);
  
  const featuredCount = posts.filter(p => p.featured).length;
  console.log(`\n✨ 成功生成配置文件: ${OUTPUT_FILE}`);
  console.log(`   - ${posts.length} 篇博客`);
  console.log(`   - ${featuredCount} 篇精选`);
}

// 执行
main();
