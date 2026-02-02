const n=`---
title: 可视化审查
slug: visual-review
description: 全程可观测的代码审查
category: 核心概念
order: 2
---

# 可视化审查

全程可观测：每一步操作透明可追溯，每个变更可审查可回滚。

## 变更总览

AI 完成后，查看所有修改：

\`\`\`
📁 src/components/
  ├─ 🟢 LoginForm/        +173 行
  ├─ 🟡 Header.tsx        +8 / -2 行
📁 src/services/
  └─ 🟢 auth.ts           +56 行

总计: 3 个新文件, 1 个修改
\`\`\`

## 执行轨迹

回溯 AI 每一步操作和决策依据：

\`\`\`
[10:23:16] 🔍 分析项目
  框架: React 18 + TypeScript
  状态: Zustand

[10:23:19] ⚡ 创建 auth.ts
  依据: 使用 axios，遵循现有 service 模式

[10:23:21] ⚡ 创建 LoginForm
  依据: 参考 RegisterForm 组件结构
\`\`\`

## 影响分析

查看变更波及范围：

\`\`\`
auth.ts 影响分析

直接依赖:
  ├─ LoginForm.tsx
  ├─ Header.tsx
  └─ RegisterForm.tsx

间接影响:
  ├─ App.tsx
  └─ PrivateRoute.tsx
\`\`\`

## 审查操作

| 快捷键 | 操作 |
|--------|------|
| \`Ctrl+Enter\` | 接受当前变更 |
| \`Ctrl+Backspace\` | 拒绝当前变更 |
| \`Ctrl+Shift+A\` | 接受全部 |
| \`Ctrl+Shift+R\` | 拒绝全部 |
| \`]\` / \`[\` | 下/上一个变更 |

**部分接受**：按行、按块、或编辑后接受

**请求修改**：选中代码 → \`Ctrl+Shift+M\`

## 审查要点

- **安全性** - 认证、授权、数据验证
- **性能** - 循环、查询、渲染
- **边界** - 空值、异常、并发

## 下一步

- [工程同构](/docs/project-isomorphism) - AI 自动适配项目
- [Agentic 工作流](/docs/agentic-workflow) - 自主执行详解
`;export{n as default};
