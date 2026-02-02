/**
 * 文档配置自动生成脚本
 * 
 * 功能：
 * 1. 扫描 src/docs 目录下的所有 .md 文件
 * 2. 解析每个文件的 frontmatter 元数据
 * 3. 按 category 分组，按 order 排序
 * 4. 生成 docsConfig.generated.ts 文件
 * 
 * 使用方法：
 *   npm run docs:sync
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
const DOCS_DIR = path.join(__dirname, config.docs.sourceDir);
const OUTPUT_FILE = path.join(__dirname, config.docs.outputFile);

// 分类排序配置（从统一配置读取）
const CATEGORY_ORDER = config.docs.categories.map(c => c.id);

/**
 * 扫描文档目录，获取所有 md 文件
 */
function scanDocsDirectory() {
  const files = fs.readdirSync(DOCS_DIR);
  // 根据统一配置排除文件
  return files.filter(file => {
    if (!file.endsWith('.md')) return false;
    return !config.common.excludePatterns.some(pattern => pattern.test(file));
  });
}

/**
 * 解析单个文档的 frontmatter
 */
function parseDocFile(filename) {
  const filepath = path.join(DOCS_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf-8');
  
  try {
    const { data } = matter(content);
    
    // 验证必需字段
    if (!data.title || !data.slug || !data.category) {
      console.warn(`⚠️  ${filename}: 缺少必需的 frontmatter 字段 (title, slug, category)`);
      return null;
    }
    
    return {
      slug: data.slug,
      title: data.title,
      description: data.description || '',
      category: data.category,
      order: data.order || 999,
    };
  } catch (error) {
    console.error(`❌ ${filename}: 解析失败 - ${error.message}`);
    return null;
  }
}

// 预定义占位符配置
const PLACEHOLDERS = config.docs.placeholders || {};

/**
 * 按分类分组并排序文档
 */
function groupAndSortDocs(docs) {
  // 按分类分组
  const grouped = {};
  
  for (const doc of docs) {
    if (!grouped[doc.category]) {
      grouped[doc.category] = [];
    }
    grouped[doc.category].push(doc);
  }
  
  // 每个分类内按 order 排序
  for (const category of Object.keys(grouped)) {
    grouped[category].sort((a, b) => a.order - b.order);
  }
  
  // 按分类顺序组织结果（包含所有预定义分类）
  const sections = [];
  
  // 添加所有预定义分类
  for (const category of CATEGORY_ORDER) {
    const scannedItems = grouped[category] || [];
    const placeholderItems = PLACEHOLDERS[category] || [];
    
    // 合并：已扫描的文档 + 预定义占位符（排除已有的 slug）
    const scannedSlugs = new Set(scannedItems.map(d => d.slug));
    const mergedItems = [
      ...scannedItems.map(doc => ({
        slug: doc.slug,
        title: doc.title,
        description: doc.description,
      })),
      ...placeholderItems.filter(p => !scannedSlugs.has(p.slug)),
    ];
    
    sections.push({
      title: category,
      items: mergedItems,
    });
    delete grouped[category];
  }
  
  // 添加其他未预定义的分类
  for (const [category, items] of Object.entries(grouped)) {
    sections.push({
      title: category,
      items: items.map(doc => ({
        slug: doc.slug,
        title: doc.title,
        description: doc.description,
      })),
    });
  }
  
  return sections;
}

/**
 * 生成 TypeScript 配置文件
 */
function generateConfigFile(sections) {
  const timestamp = new Date().toISOString();
  
  const content = `// 此文件由脚本自动生成，请勿手动修改
// 生成时间: ${timestamp}
// 运行 npm run docs:sync 更新此文件

import type { DocSection } from './docsConfig';

export const generatedDocsConfig: DocSection[] = ${JSON.stringify(sections, null, 2)};
`;
  
  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
}

/**
 * 主函数
 */
function main() {
  console.log('📚 开始扫描文档目录...\n');
  
  // 扫描文件
  const files = scanDocsDirectory();
  console.log(`找到 ${files.length} 个 markdown 文件\n`);
  
  // 解析文档
  const docs = [];
  for (const file of files) {
    const doc = parseDocFile(file);
    if (doc) {
      docs.push(doc);
      console.log(`✅ ${file}: ${doc.title} (${doc.category})`);
    }
  }
  
  if (docs.length === 0) {
    console.log('\n⚠️  没有找到有效的文档文件');
    return;
  }
  
  // 分组排序
  const sections = groupAndSortDocs(docs);
  
  // 生成配置文件
  generateConfigFile(sections);
  
  console.log(`\n✨ 成功生成配置文件: ${OUTPUT_FILE}`);
  console.log(`   - ${sections.length} 个分类`);
  console.log(`   - ${docs.length} 篇文档`);
}

// 执行
main();
