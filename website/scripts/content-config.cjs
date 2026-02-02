/**
 * 官网内容配置 - 集中管理文档和博客的配置
 * 
 * 修改此文件后运行 npm run content:sync 更新官网内容
 */

module.exports = {
  // ==================== 文档配置 ====================
  docs: {
    // 文档源目录
    sourceDir: '../src/docs',
    // 输出配置文件
    outputFile: '../src/pages/Docs/docsConfig.generated.ts',
    
    // 分类配置（按显示顺序排列）
    categories: [
      { id: '快速开始', label: '快速开始', description: '新用户入门指南' },
      { id: '核心概念', label: '核心概念', description: '核心功能介绍' },
      { id: '功能指南', label: '功能指南', description: '具体功能使用说明' },
      { id: '进阶使用', label: '进阶使用', description: '高级功能和 API' },
    ],

    // 预定义文档项（无实际文件时显示为占位）
    placeholders: {
      '功能指南': [
        { slug: 'code-generation', title: '代码生成', description: '使用 AI 生成代码' },
        { slug: 'code-review', title: '代码审查', description: '审查和修改生成的代码' },
        { slug: 'refactoring', title: '重构', description: '智能重构代码' },
        { slug: 'debugging', title: '调试', description: 'AI 辅助调试' },
      ],
      '进阶使用': [
        { slug: 'custom-rules', title: '自定义规则', description: '配置项目特定规则' },
        { slug: 'extensions', title: '扩展开发', description: '开发自定义扩展' },
        { slug: 'api-reference', title: 'API 参考', description: 'API 完整参考文档' },
      ],
    },
  },

  // ==================== 博客配置 ====================
  blog: {
    // 博客源目录
    sourceDir: '../src/blog',
    // 输出配置文件
    outputFile: '../src/pages/Blog/blogData.generated.ts',
    
    // 标签配置
    tags: [
      { id: 'announcement', label: '公告', description: '产品发布、更新公告' },
      { id: 'tutorial', label: '教程', description: '使用教程和最佳实践' },
      { id: 'engineering', label: '工程', description: '技术架构和实现' },
      { id: 'product', label: '产品', description: '产品功能介绍' },
      { id: 'community', label: '社区', description: '社区动态和活动' },
    ],
  },

  // ==================== 通用配置 ====================
  common: {
    // 排除的文件模式
    excludePatterns: [
      /^_/,           // 以 _ 开头的文件（模板）
      /^README\.md$/, // README 文件
    ],
  },
};
