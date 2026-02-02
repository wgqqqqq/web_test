import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import './Pillars.scss';

const pillars = [
  {
    id: 'agentic',
    title: 'Agentic Runtime',
    subtitle: 'AI 自主执行引擎',
    cells: [
      '意图理解', '任务分解', '工具编排',
      '并发执行', '状态管理', '错误恢复',
      '事件驱动', '可观测', '可中断',
    ],
  },
  {
    id: 'visual',
    title: 'Visual Review',
    subtitle: '人类审查界面',
    cells: [
      'CodeMap', '执行轨迹', '依赖图',
      '架构视图', '变更分析', 'Diff 审查',
      '证据链', '影响域', '风险评估',
    ],
  },
  {
    id: 'extensible',
    title: 'Extensible Platform',
    subtitle: '能力扩展生态',
    cells: [
      'MCP 协议', '工具扩展', 'API 集成',
      'Skills', 'Rules', 'Templates',
      'Agent 编排', '工作流', '自动化',
    ],
  },
];

export default function Pillars() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section 
      className={`pillars snap-section ${isVisible ? 'pillars--visible is-visible' : ''}`} 
      id="pillars"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="pillars__container">
        <div className="pillars__header">
          <h2 className="pillars__title">能力图谱</h2>
        </div>

        <div className="pillars__grid">
          {pillars.map((pillar, pillarIndex) => (
            <div
              key={pillar.id}
              className="pillars__pillar"
              style={{ '--delay': `${pillarIndex * 0.15}s` } as React.CSSProperties}
            >
              <div className="pillars__pillar-header">
                <h3 className="pillars__pillar-title">{pillar.title}</h3>
                <span className="pillars__pillar-subtitle">{pillar.subtitle}</span>
              </div>
              
              <div className="pillars__cube-face">
                {pillar.cells.map((cell, cellIndex) => (
                  <div key={cellIndex} className="pillars__cell">
                    <span>{cell}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
