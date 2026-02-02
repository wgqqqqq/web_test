// 此文件由脚本自动生成，请勿手动修改
// 生成时间: 2026-02-02T07:37:56.184Z
// 运行 npm run blog:sync 更新此文件

import type { BlogPost } from './blogData';

export const generatedBlogPosts: BlogPost[] = [
  {
    slug: 'community-spotlight-january',
    title: '社区精选：2026 年 1 月',
    excerpt: '本月社区精选，展示用户使用 VCoder 完成的精彩项目和创意用法。',
    content: `欢迎来到 VCoder 社区精选！本月我们收集了一些令人印象深刻的社区项目和创意用法。

## 本月亮点

### 🏆 最佳项目：AI 驱动的代码审查工具

社区成员 @developer_zhang 使用 VCoder 构建了一个自动化代码审查工具：

- 自动分析 PR 变更
- 生成审查建议
- 集成 GitHub Actions

> "VCoder 的 Agentic 能力让我可以快速原型化这个想法。从概念到可用的 MVP 只用了一个周末。" —— @developer_zhang

### 🎨 创意用法：交互式文档生成

@doc_master 分享了使用 VCoder 生成交互式 API 文档的工作流：

1. 分析代码中的 API 端点
2. 自动生成 OpenAPI 规范
3. 创建可交互的示例

### 🔧 实用技巧：自定义 Prompt 模板

@prompt_engineer 分享了一套高效的 Prompt 模板：

\`\`\`markdown
## 代码重构模板

我需要重构以下代码：
- 目标：[描述重构目标]
- 约束：[列出需要保持的行为]
- 优先级：[性能/可读性/可维护性]

请先分析现有代码，然后提出重构方案。
\`\`\`

## 社区统计

- 本月新增用户：2,500+
- GitHub Star：1,200+
- Discord 成员：800+

## 参与社区

- **GitHub**：提交 Issue 和 PR
- **Discord**：实时交流和求助
- **Twitter**：关注 @VCoderApp 获取最新动态

## 下月预告

我们正在筹备：

- 社区插件市场
- 月度 Hackathon
- 直播 Workshop

感谢每一位社区成员的贡献！`,
    date: 'Wed Jan 14 2026 16:00:00 GMT-0800 (北美太平洋标准时间)',
    author: 'Community Team',
    tags: ['community'],
    readTime: 4,
    featured: false,
  },
  {
    slug: 'context-management-best-practices',
    title: '上下文管理最佳实践',
    excerpt: '掌握 VCoder 的上下文管理功能，学习如何让 AI 更好地理解你的项目结构和代码风格。',
    content: `有效的上下文管理是发挥 VCoder 最大效能的关键。本文将分享上下文管理的最佳实践。

## 理解上下文窗口

每个 AI 模型都有上下文窗口限制。VCoder 通过智能管理来最大化利用这个窗口：

- **自动摘要**：长对话自动压缩
- **相关性排序**：优先保留相关信息
- **增量更新**：只传递变化的内容

## 项目规则文件

在项目根目录创建 \`.vcoder/rules.md\`，定义项目规则：

\`\`\`markdown
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
\`\`\`

## 主动添加上下文

### 使用 @ 引用

在对话中使用 @ 符号引用文件或目录：

\`\`\`
请帮我重构 @src/utils/helpers.ts 中的日期处理函数
\`\`\`

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

使用 \`/context\` 命令查看当前上下文状态。`,
    date: 'Fri Jan 09 2026 16:00:00 GMT-0800 (北美太平洋标准时间)',
    author: 'Tech Team',
    tags: ['tutorial'],
    readTime: 7,
    featured: false,
  },
  {
    slug: 'building-vcoder-architecture',
    title: '构建 VCoder：技术架构深度解析',
    excerpt: '揭秘 VCoder 背后的技术架构，包括 Rust 后端、Tauri 框架以及我们如何处理 AI 模型集成。',
    content: `本文将深入介绍 VCoder 的技术架构，分享我们在构建这款产品过程中的技术决策和实践经验。

## 整体架构

VCoder 采用前后端分离的桌面应用架构：

\`\`\`
┌─────────────────────────────────────┐
│           React Frontend            │
├─────────────────────────────────────┤
│            Tauri Bridge             │
├─────────────────────────────────────┤
│           Rust Backend              │
│  ┌─────────┬─────────┬───────────┐  │
│  │ Agentic │   LSP   │  Terminal │  │
│  │  Core   │ Service │  Service  │  │
│  └─────────┴─────────┴───────────┘  │
└─────────────────────────────────────┘
\`\`\`

## 为什么选择 Rust + Tauri

### 性能

Rust 的零成本抽象和内存安全特性，让我们能够构建高性能的后端服务：

- 快速的文件系统操作
- 高效的并发处理
- 低内存占用

### 跨平台

Tauri 让我们可以用同一套代码支持三大平台，同时保持原生性能。

### 安全性

Rust 的所有权系统从根本上避免了内存安全问题，这对于一个需要访问文件系统和执行命令的工具至关重要。

## Agentic Core 设计

Agentic Core 是 VCoder 的核心引擎：

\`\`\`rust
pub struct AgenticCore {
    planner: Planner,
    executor: Executor,
    memory: ConversationMemory,
    tools: ToolRegistry,
}

impl AgenticCore {
    pub async fn process(&mut self, input: UserInput) -> Result<Response> {
        let plan = self.planner.create_plan(&input, &self.memory).await?;
        let result = self.executor.execute(plan, &self.tools).await?;
        self.memory.record(input, result.clone());
        Ok(result)
    }
}
\`\`\`

## AI 模型集成

VCoder 支持多种 AI 模型，通过统一的抽象层进行管理：

- OpenAI GPT 系列
- Anthropic Claude 系列
- 本地模型（通过 Ollama）

模型切换对上层业务完全透明。

## 未来规划

- 插件系统
- 协作功能
- 更多语言支持`,
    date: 'Sun Jan 04 2026 16:00:00 GMT-0800 (北美太平洋标准时间)',
    author: 'Engineering Team',
    tags: ['engineering'],
    readTime: 12,
    featured: false,
  },
  {
    slug: 'plan-mode-guide',
    title: 'Plan 模式使用指南：让 AI 帮你规划任务',
    excerpt: '学习如何使用 VCoder 的 Plan 模式，将复杂任务分解为可执行的步骤，提升开发效率。',
    content: `Plan 模式是 VCoder 处理复杂任务的利器。本指南将帮助你掌握这一强大功能。

## 何时使用 Plan 模式

Plan 模式特别适合以下场景：

- 实现新功能（涉及多个文件）
- 重构现有代码
- 修复复杂 bug
- 项目初始化和配置

## 如何启动 Plan 模式

在 VCoder 中切换到 Plan 模式有两种方式：

1. 点击模式选择器，选择 "Plan"
2. 在对话中输入 \`/plan\` 命令

## Plan 文件结构

Plan 模式会生成一个 \`.plan.md\` 文件：

\`\`\`markdown
# 任务：实现用户认证功能

## 目标
为应用添加完整的用户认证系统

## 步骤

- [ ] 1. 创建用户模型和数据库迁移
- [ ] 2. 实现注册 API
- [ ] 3. 实现登录 API
- [ ] 4. 添加 JWT 令牌验证
- [ ] 5. 创建认证中间件
- [ ] 6. 编写单元测试

## 注意事项
- 密码需要加密存储
- 令牌有效期设置为 24 小时
\`\`\`

## 最佳实践

### 1. 清晰描述目标

越清晰的目标，AI 制定的计划越准确：

❌ "帮我写个登录"
✅ "实现基于 JWT 的用户登录功能，包括邮箱密码验证和令牌刷新机制"

### 2. 分阶段确认

对于大型任务，建议分阶段执行和确认：

1. 让 AI 先生成完整计划
2. 审核并调整计划
3. 逐步执行，每完成一个阶段检查结果

### 3. 利用上下文

在启动 Plan 模式前，可以先让 AI 了解项目现状：

- 打开相关文件让 AI 分析
- 说明现有的架构和约定
- 指出需要注意的依赖关系`,
    date: 'Tue Dec 30 2025 16:00:00 GMT-0800 (北美太平洋标准时间)',
    author: 'Product Team',
    tags: ['tutorial', 'product'],
    readTime: 6,
    featured: false,
  },
  {
    slug: 'agentic-workflow-explained',
    title: '深入理解 Agentic 工作流',
    excerpt: '本文将深入探讨 VCoder 的核心概念——Agentic 工作流，解释它如何让 AI 从被动响应转变为主动协作。',
    content: `Agentic 工作流是 VCoder 的核心创新。本文将深入解析这一概念，帮助你更好地利用 VCoder 的能力。

## 什么是 Agentic 工作流？

传统的 AI 助手采用"请求-响应"模式：你问一个问题，AI 给出答案。这种模式简单直接，但有明显的局限性：

- 每次交互都是独立的
- AI 无法执行实际操作
- 复杂任务需要多次手动交互

Agentic 工作流彻底改变了这一范式。在这种模式下，AI 不再是被动的回答者，而是主动的协作者：

\`\`\`
传统模式: 用户 → 请求 → AI → 响应 → 用户

Agentic 模式: 用户 → 目标 → AI → [规划 → 执行 → 验证 → 调整]* → 结果
\`\`\`

## 核心组件

### 1. 规划器 (Planner)

规划器负责将用户的高层目标分解为可执行的步骤：

- 分析任务复杂度
- 识别所需资源和工具
- 生成执行计划
- 处理依赖关系

### 2. 执行器 (Executor)

执行器负责实际执行计划中的每个步骤：

- 调用相应的工具
- 处理执行结果
- 捕获和处理错误
- 记录执行日志

### 3. 验证器 (Validator)

验证器确保执行结果符合预期：

- 检查输出正确性
- 验证副作用
- 评估完成度

## 实际应用示例

假设你让 VCoder "重构这个函数，提取公共逻辑"：

1. **规划阶段**：AI 分析函数，识别重复代码，制定重构方案
2. **执行阶段**：创建新的公共函数，修改原函数调用
3. **验证阶段**：确保测试通过，功能不变

整个过程中，你只需要在关键决策点进行确认。`,
    date: 'Sat Dec 27 2025 16:00:00 GMT-0800 (北美太平洋标准时间)',
    author: 'Tech Team',
    tags: ['tutorial', 'engineering'],
    readTime: 8,
    featured: true,
  },
  {
    slug: 'introducing-vcoder',
    title: 'VCoder 正式发布：AI 与人类协同的新范式',
    excerpt: '今天，我们很高兴地宣布 VCoder 正式发布。这是一款革命性的 AI 编程工具，旨在改变开发者与 AI 协作的方式。',
    content: `今天，我们很高兴地宣布 VCoder 正式发布。这是一款革命性的 AI 编程工具，旨在改变开发者与 AI 协作的方式。

## 为什么我们构建 VCoder

在过去的几年中，AI 编程助手已经成为开发者工具箱中不可或缺的一部分。然而，现有的工具大多停留在"问答"模式——开发者提问，AI 回答。这种模式虽然有用，但远远没有发挥 AI 的全部潜力。

我们相信，AI 应该能够：

- **主动理解**项目结构和代码风格
- **自主执行**复杂的多步骤任务
- **持续学习**开发者的偏好和习惯
- **协同工作**而非简单的问答

## VCoder 的核心特性

### Agentic 工作流

VCoder 的核心是 Agentic 工作流系统。不同于传统的对话式 AI，VCoder 可以：

1. 分析你的需求并制定执行计划
2. 自主调用工具完成任务
3. 根据执行结果调整策略
4. 在遇到问题时主动寻求确认

### 多模式支持

VCoder 提供三种工作模式：

- **Chat 模式**：快速问答和代码讨论
- **Plan 模式**：复杂任务的规划和执行
- **Debug 模式**：系统化的问题诊断和修复

### 上下文感知

VCoder 能够深度理解你的项目：

- 自动分析项目结构
- 理解代码依赖关系
- 记住之前的对话和决策

## 开始使用

立即下载 VCoder，开启 AI 协同编程的新篇章。我们提供 Windows、macOS 和 Linux 版本。

感谢所有 Beta 测试用户的反馈，是你们帮助我们打造了这款产品。`,
    date: 'Wed Dec 24 2025 16:00:00 GMT-0800 (北美太平洋标准时间)',
    author: 'VCoder Team',
    tags: ['announcement', 'product'],
    readTime: 5,
    featured: true,
  }
];
