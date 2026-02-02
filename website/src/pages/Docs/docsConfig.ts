/**
 * 文档配置
 * 
 * 此文件定义文档的类型接口和辅助函数。
 * 实际的文档配置由脚本自动生成（docsConfig.generated.ts）。
 * 
 * 文档更新流程：
 * 1. 在 src/docs/ 目录下创建或编辑 .md 文件
 * 2. 确保每个文件包含 frontmatter 元数据
 * 3. 运行 npm run docs:sync 同步配置
 * 
 * Frontmatter 格式示例：
 * ---
 * title: 文档标题
 * slug: url-slug
 * description: 文档描述
 * category: 分类名称
 * order: 排序数字
 * ---
 */

export interface DocItem {
  slug: string;
  title: string;
  description?: string;
}

export interface DocSection {
  title: string;
  items: DocItem[];
}

// 导入自动生成的配置
import { generatedDocsConfig } from './docsConfig.generated';

// 导出文档配置（使用自动生成的配置）
export const docsConfig: DocSection[] = generatedDocsConfig;

// 获取所有文档的扁平列表
export function getAllDocs(): DocItem[] {
  return docsConfig.flatMap(section => section.items);
}

// 根据 slug 获取文档信息
export function getDocBySlug(slug: string): DocItem | undefined {
  return getAllDocs().find(doc => doc.slug === slug);
}

// 获取上一篇和下一篇文档
export function getAdjacentDocs(slug: string): { prev?: DocItem; next?: DocItem } {
  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex(doc => doc.slug === slug);
  
  return {
    prev: currentIndex > 0 ? allDocs[currentIndex - 1] : undefined,
    next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : undefined,
  };
}
