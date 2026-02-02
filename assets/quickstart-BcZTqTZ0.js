const n=`---
title: 快速上手
slug: quickstart
description: 3 分钟入门
category: 快速开始
order: 3
---

# 快速上手

3 分钟体验 VCoder 的三大核心特性。

## 1. 体验 Agentic

按 \`Ctrl+L\` 打开 AI 面板，输入：

\`\`\`
创建一个 TodoList 组件，包含添加、删除、标记完成功能
\`\`\`

AI 会自主完成整个任务，无需逐步引导。

## 2. 查看执行轨迹（可观测）

右侧面板实时显示执行过程：

\`\`\`
┌─ 任务: 创建 TodoList 组件
├─ [分析] 检测到 React + TypeScript
├─ [规划] 将创建 3 个文件
├─ [执行] TodoList.tsx ✓
├─ [执行] TodoList.scss ✓
├─ [执行] types.ts ✓
└─ ✓ 完成
\`\`\`

点击任意步骤查看决策依据。

## 3. 审查变更

变更面板显示所有修改：

- 🟢 新增文件
- 🟡 修改文件

使用 Diff 视图逐行审查，不满意可直接修改：

\`\`\`
把 Todo 的 id 改成数字类型
\`\`\`

## 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| \`Ctrl+L\` | AI 对话 |
| \`Ctrl+Shift+A\` | 接受所有变更 |
| \`Ctrl+Shift+R\` | 拒绝所有变更 |

## 实用技巧

**引用文件**：使用 \`@\` 引用项目内容

\`\`\`
参考 @src/utils/helpers.ts 的风格重构 @src/api/client.ts
\`\`\`

**批量任务**：一次描述多个任务

\`\`\`
1. 为 API 函数添加错误处理
2. 创建统一错误提示组件
3. 更新现有调用点
\`\`\`

## 下一步

- [Agentic 工作流](/docs/agentic-workflow) - 深入了解自主执行
- [可视化审查](/docs/visual-review) - 掌握审查技巧
- [工程同构](/docs/project-isomorphism) - AI 自动适配项目
`;export{n as default};
