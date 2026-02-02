const n=`# 官网文档管理指南

本目录包含 VCoder 官网的所有文档内容。

## 文档更新流程

### 1. 添加新文档

\`\`\`bash
# 1. 复制模板创建新文档
cp src/docs/_template.md src/docs/your-doc-name.md

# 2. 编辑文档内容和 frontmatter
# 3. 同步配置
npm run docs:sync
\`\`\`

### 2. 修改现有文档

直接编辑对应的 \`.md\` 文件即可，无需运行同步命令（除非修改了 frontmatter）。

### 3. 同步配置

修改了文档的 frontmatter（标题、分类等）后，运行：

\`\`\`bash
npm run docs:sync
\`\`\`

### 4. 构建发布

构建时会自动运行文档同步：

\`\`\`bash
npm run build
\`\`\`

## Frontmatter 规范

每个文档文件必须以 frontmatter 开头：

\`\`\`yaml
---
title: 文档标题          # 必填：显示在侧边栏
slug: url-slug          # 必填：URL 路径
description: 简短描述    # 可选：侧边栏副标题
category: 分类名称       # 必填：文档分类
order: 1                # 可选：分类内排序（默认999）
---
\`\`\`

### 支持的分类

按显示顺序：

| 分类 | 说明 |
|------|------|
| 快速开始 | 入门教程、安装指南 |
| 核心概念 | 核心功能介绍 |
| 功能指南 | 具体功能使用说明 |
| 进阶使用 | 高级功能、API 参考 |

## 目录结构

\`\`\`
src/docs/
├── README.md              # 本文件
├── _template.md           # 文档模板（不会被扫描）
├── introduction.md        # 简介
├── installation.md        # 安装
├── quickstart.md          # 快速上手
├── agentic-workflow.md    # Agentic 工作流
├── visual-review.md       # 可视化审查
└── project-isomorphism.md # 工程同构
\`\`\`

## 常见问题

### Q: 新文档不显示？

运行 \`npm run docs:sync\` 同步配置。

### Q: 文档顺序不对？

检查 frontmatter 中的 \`order\` 字段，数字越小越靠前。

### Q: 页面显示 frontmatter？

确保 frontmatter 格式正确（开头和结尾都是三个短横线 \`---\`）。

## 相关文件

- \`scripts/content-config.cjs\` - **统一配置文件**（分类、标签等配置在此修改）
- \`scripts/generate-docs-config.cjs\` - 文档配置生成脚本
- \`src/pages/Docs/docsConfig.ts\` - 文档配置入口
- \`src/pages/Docs/docsConfig.generated.ts\` - 自动生成的配置（勿手动编辑）

## 修改分类配置

如需添加/修改/排序分类，编辑 \`scripts/content-config.cjs\`：

\`\`\`javascript
docs: {
  categories: [
    { id: '快速开始', label: '快速开始', description: '新用户入门指南' },
    { id: '核心概念', label: '核心概念', description: '核心功能介绍' },
    // 添加新分类...
  ],
}
\`\`\`
`;export{n as default};
