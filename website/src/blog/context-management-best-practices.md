---
title: 上下文管理最佳实践
slug: context-management-best-practices
excerpt: 掌握 VCoder 的上下文管理功能，学习如何让 AI 更好地理解你的项目结构和代码风格。
date: 2026-01-10
author: Tech Team
tags: [tutorial]
readTime: 7
featured: false
---

有效的上下文管理是发挥 VCoder 最大效能的关键。本文将分享上下文管理的最佳实践。

## 理解上下文窗口

每个 AI 模型都有上下文窗口限制。VCoder 通过智能管理来最大化利用这个窗口：

- **自动摘要**：长对话自动压缩
- **相关性排序**：优先保留相关信息
- **增量更新**：只传递变化的内容

## 项目规则文件

在项目根目录创建 `.vcoder/rules.md`，定义项目规则：

```markdown
# 项目规则

## 代码风格
- 使用 TypeScript 严格模式
- 组件使用函数式写法
- 状态管理使用 Zustand

## 命名规范
- 组件：PascalCase
- 函数：camelCase
- 常量：UPPER_SNAKE_CASE

## 文件组织
- 组件放在 components/
- 工具函数放在 utils/
- 类型定义放在 types/
```

## 主动添加上下文

### 使用 @ 引用

在对话中使用 @ 符号引用文件或目录：

```
请帮我重构 @src/utils/helpers.ts 中的日期处理函数
```

### 选中代码

选中编辑器中的代码，AI 会自动将其纳入上下文。

## 上下文优先级

VCoder 按以下优先级组织上下文：

1. **当前对话**：最近的交互
2. **主动引用**：@ 引用的文件
3. **项目规则**：.vcoder/ 配置
4. **历史摘要**：之前对话的压缩版本

## 调试上下文问题

如果 AI 的回答不符合预期，检查：

- 是否引用了正确的文件
- 项目规则是否最新
- 上下文是否被截断

使用 `/context` 命令查看当前上下文状态。
