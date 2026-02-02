import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import './Features.scss';

const features = [
  { level: 'L0', title: '跨平台内核', desc: 'Electron + Web 统一架构' },
  { level: 'L1', title: '可编程 IDE', desc: '编辑器、终端、面板可扩展' },
  { level: 'L2', title: '执行引擎', desc: 'Agent Runtime 可组合调度' },
  { level: 'L3', title: '工作模式', desc: 'Agent / Plan / Debug 多态切换' },
  { level: 'L4', title: '架构视图', desc: 'CodeMap 全局理解与导航' },
  { level: 'L5', title: '多智能体', desc: 'DAG 编排复杂任务流' },
  { level: 'L6', title: '能力生态', desc: 'MCP / Skills / Rules 可扩展' },
];

export default function Features() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className={`features ${isVisible ? 'features--visible' : ''}`} id="capabilities" ref={ref}>
      <div className="features__container">
        <div className="features__header">
          <h2 className="features__title">技术架构</h2>
        </div>

        <div className="features__layers">
          {features.map((feature, index) => (
            <div
              key={feature.level}
              className="features__layer"
              style={{ '--delay': `${index * 0.05}s` } as React.CSSProperties}
            >
              <span className="features__layer-level">{feature.level}</span>
              <span className="features__layer-title">{feature.title}</span>
              <span className="features__layer-desc">{feature.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
