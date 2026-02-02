---
title: 工程同构
slug: project-isomorphism
description: AI 自动适配项目特征
category: 核心概念
order: 3
---

# 工程同构

工程同构的核心：**自动分析工程特征，让 AI 生成的代码天然适配项目**。

## 工程特征分析

VCoder 自动识别并提取项目的关键特征：

| 特征维度 | 分析内容 |
|---------|---------|
| **技术栈** | 框架、语言版本、构建工具、依赖关系 |
| **代码风格** | 命名约定、缩进规则、注释风格 |
| **目录结构** | 模块组织、文件命名规范 |
| **设计模式** | 组件结构、API 封装方式、状态管理模式 |
| **规则约束** | ESLint/Prettier 配置、AI 规则文件 |

这些特征会自动注入 AI 上下文，无需手动配置。

## 透明化管理

「工程上下文面板」让特征分析过程透明可控：

**文档** - 识别项目中的规则文件
- 通用：`AGENTS.md`、`CLAUDE.md`、`README.md`
- 编码：`.cursorrules`、`.editorconfig`、`eslint.config.*`
- 设计：`ARCHITECTURE.md`、`API-DESIGN.md`

**架构** - 可视化模块依赖关系

**知识库** - 扩展领域知识
- Skill：本地 Markdown，直接注入
- RAG：外部检索，按需获取

> 兼容 Cursor、Claude、Copilot、Windsurf、Cline 等 AI IDE 规则格式

## Token 可视化

底部状态栏显示上下文占用情况，可按需开关文档，精细控制 AI 可见范围。

## 下一步

- [Agentic 工作流](/docs/agentic-workflow) - 自主执行模式
- [可视化审查](/docs/visual-review) - 审查 AI 工作
