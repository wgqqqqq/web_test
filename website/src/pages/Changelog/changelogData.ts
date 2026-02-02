// 更新日志数据配置

export type ChangeType = 'feature' | 'improvement' | 'fix' | 'breaking';

export interface ChangeItem {
  type: ChangeType;
  title: string;
  description?: string;
  items?: string[];
}

export interface ChangeSection {
  title: string;
  changes: ChangeItem[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  title?: string;
  sections: ChangeSection[];
}

// 更新日志数据
export const changelogData: ChangelogEntry[] = [
  {
    version: '0.2.0',
    date: '2025-12-31',
    title: 'Plan 模式 & Debug 增强',
    sections: [
      {
        title: '核心功能',
        changes: [
          {
            type: 'feature',
            title: 'Plan 模式',
            description: '全新的 Plan 规划与执行能力',
            items: [
              '支持流式显示 Plan 创建过程',
              '新增 .plan.md 文件专用预览组件',
              '实时监听 Plan 文件的变更',
              '对话中编辑过 Plan 文件则在最后追加工具卡片',
              'Prompt 加入 plan 结构指导，提升规划质量',
            ],
          },
          {
            type: 'feature',
            title: 'Debug 模式',
            description: '新增 ArkTS 语言调试支持，支持模拟器及真机调试，可以从模拟器或真机上拉取实时运行日志并分析',
          },
          {
            type: 'feature',
            title: '模式系统增强',
            items: [
              '模式选择器：支持添加/选择不同对话模式',
              '会话模式记录：记录每次会话使用的模式',
              '工具同步功能：新添加的工具自动加入默认启用该工具的模式',
            ],
          },
          {
            type: 'feature',
            title: 'FileFinder SubAgent',
            description: '新增 FileFinder 子智能体，解决 Explore 分析页面的信息损失问题，提升文件查找的准确性和效率',
          },
          {
            type: 'feature',
            title: 'Claude 模型支持',
            description: '新增对 Claude 模型的支持',
          },
        ],
      },
      {
        title: 'UI 改进',
        changes: [
          {
            type: 'improvement',
            title: '启动页重设计',
            items: [
              '启动页与主页面合一，优化启动页面设计',
              '添加流畅的工作区打开过渡动画',
              '支持显示所有最近打开的工作区',
            ],
          },
          {
            type: 'improvement',
            title: '样式优化',
            items: [
              '优化拖拽布局的性能',
              '优化用户消息预览卡片样式',
              '优化边框样式和配置中心的分类',
              '优化卡片和切换按钮的样式',
            ],
          },
        ],
      },
      {
        title: '问题修复',
        changes: [
          {
            type: 'fix',
            title: '稳定性修复',
            items: [
              'Edit 和编译工具并行执行问题',
              'Mac 右上角放大缩小按钮引发窗口不能点击',
              'Mac 右上角关闭窗口时重复触发清理逻辑',
              'Mac 输入框异常问题',
              '聊天框中文输入点击 Enter 就发送（应先确认拼音再发送）',
              'CreatePlan 卡片 Todo 状态同步问题',
            ],
          },
        ],
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2025-12-25',
    title: 'AI 思维链 & Skill 管理',
    sections: [
      {
        title: '核心功能',
        changes: [
          {
            type: 'feature',
            title: 'AI 思维链',
            description: '支持实时展示 AI 的推理过程，帮助用户理解模型决策逻辑',
            items: [
              '交错式思考：思考过程与回复内容交替显示，实时呈现推理链条',
              '保留式思考（仅限 glm4.7）：支持在上下文中保留思考内容',
              '重新设计思考卡片样式，适配 Anthropic/OpenAI 格式模型',
            ],
          },
          {
            type: 'feature',
            title: 'Skill 管理',
            description: '新增完整的 Skill 管理界面',
            items: [
              '支持 Skill 的增加、删除、启用/禁用',
              '区分用户级和项目级 Skill',
              'Skill 入口提升到一级导航',
            ],
          },
          {
            type: 'feature',
            title: '会话管理增强',
            items: [
              '对话导出长图：将对话轮次导出为带有品牌标识和时间戳的长图',
              '会话标题编辑：支持自定义修改会话标题',
              '轮次指示器：显示当前对话轮次计数',
            ],
          },
          {
            type: 'feature',
            title: '上下文引用能力',
            description: '输入 @ 唤起文件选择器，快速将项目文件或目录添加为上下文',
          },
          {
            type: 'feature',
            title: '其他功能',
            items: [
              'SubAgent 开关：可控制是否启用子智能体协作',
              '智谱流式工具调用：支持智谱 AI 模型流式工具调用',
              '剪贴板粘贴：Ctrl+V 直接粘贴系统剪贴板中的文件',
            ],
          },
        ],
      },
      {
        title: '工具优化',
        changes: [
          {
            type: 'improvement',
            title: '工具改进',
            items: [
              'Edit：返回编辑行号',
              'Read：修复行号显示问题',
              'Grep：修复 type 参数，输出格式与 ripgrep 对齐',
              'AskUserQuestion：支持单次询问多个问题',
              'HmosCompilation：优化工具卡片展示',
            ],
          },
        ],
      },
      {
        title: 'UI 改进',
        changes: [
          {
            type: 'improvement',
            title: '视觉优化',
            items: [
              '工具卡片、文件树、通知中心样式优化',
              '面板布局、Header、ChatInput 视觉调整',
              '数字输入框、工具开关控件重设计',
              'TodoList 交互重设计',
            ],
          },
        ],
      },
      {
        title: '问题修复',
        changes: [
          {
            type: 'fix',
            title: '稳定性修复',
            items: [
              '前端事件消费速度赶不上后端生产速度',
              'PowerShell 命令执行卡死',
              'Windows 下命令执行弹窗问题',
              '初次使用保存 unknown 模型',
              'Git/Terminal 面板切换异常',
              'SubAgent 思考卡片显示问题',
              'FlowChat 流式处理性能优化',
            ],
          },
        ],
      },
    ],
  },
];

// 获取最新版本
export function getLatestVersion(): ChangelogEntry | undefined {
  return changelogData[0];
}

// 获取所有版本号
export function getAllVersions(): string[] {
  return changelogData.map(entry => entry.version);
}
