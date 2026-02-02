# 官网博客管理指南

本目录包含 VCoder 官网的所有博客文章。

## 博客更新流程

### 1. 添加新博客

```bash
# 1. 复制模板创建新博客
cp src/blog/_template.md src/blog/your-blog-slug.md

# 2. 编辑博客内容和 frontmatter
# 3. 同步配置
npm run blog:sync
```

### 2. 修改现有博客

直接编辑对应的 `.md` 文件即可，修改内容后运行 `npm run blog:sync`。

### 3. 同步配置

修改博客后运行：

```bash
npm run blog:sync
```

### 4. 同时同步文档和博客

```bash
npm run content:sync
```

## Frontmatter 规范

每个博客文件必须以 frontmatter 开头：

```yaml
---
title: 博客标题          # 必填：文章标题
slug: url-slug          # 必填：URL 路径
excerpt: 摘要           # 必填：文章摘要
date: 2026-01-20        # 必填：发布日期
author: VCoder Team     # 必填：作者名称
tags: [announcement]    # 必填：标签数组
readTime: 5             # 必填：阅读时间（分钟）
featured: false         # 可选：是否精选（默认 false）
---
```

### 支持的标签

| 标签 | 说明 |
|------|------|
| announcement | 公告 |
| tutorial | 教程 |
| engineering | 工程/技术 |
| product | 产品 |
| community | 社区 |

## 目录结构

```
src/blog/
├── README.md                         # 本文件
├── _template.md                      # 博客模板（不会被扫描）
├── introducing-vcoder.md             # VCoder 发布公告
├── agentic-workflow-explained.md     # Agentic 工作流解析
├── plan-mode-guide.md               # Plan 模式指南
├── building-vcoder-architecture.md  # 技术架构解析
├── context-management-best-practices.md  # 上下文管理实践
└── community-spotlight-january.md   # 社区精选
```

## 常见问题

### Q: 新博客不显示？

运行 `npm run blog:sync` 同步配置。

### Q: 博客排序不对？

博客按日期降序排列，检查 frontmatter 中的 `date` 字段。

### Q: 精选文章怎么设置？

在 frontmatter 中设置 `featured: true`。

## 相关文件

- `scripts/content-config.cjs` - **统一配置文件**（标签等配置在此修改）
- `scripts/generate-blog-config.cjs` - 博客配置生成脚本
- `src/pages/Blog/blogData.ts` - 博客数据入口
- `src/pages/Blog/blogData.generated.ts` - 自动生成的配置（勿手动编辑）

## 修改标签配置

如需添加/修改标签，编辑 `scripts/content-config.cjs`：

```javascript
blog: {
  tags: [
    { id: 'announcement', label: '公告', description: '产品发布、更新公告' },
    { id: 'tutorial', label: '教程', description: '使用教程和最佳实践' },
    // 添加新标签...
  ],
}
```
