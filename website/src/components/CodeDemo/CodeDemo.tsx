import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import './CodeDemo.scss';

const workflow = [
  { step: '01', action: '意图', desc: 'AI 理解你的目标', isHuman: false },
  { step: '02', action: '规划', desc: 'AI 制定实现路径', isHuman: false },
  { step: '03', action: '执行', desc: 'AI 自主完成任务', isHuman: false },
  { step: '04', action: '验证', desc: 'AI 确保质量可靠', isHuman: false },
  { step: '05', action: '审查', desc: '人类把控最终决策', isHuman: true },
  { step: '06', action: '沉淀', desc: '知识资产持续积累', isHuman: true },
];

export default function CodeDemo() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section 
      className={`demo snap-section ${isVisible ? 'demo--visible is-visible' : ''}`} 
      id="demo"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="demo__container">
        <div className="demo__header">
          <h2 className="demo__title">协同流程</h2>
        </div>

        <div className="demo__track">
          <div className="demo__steps">
            {workflow.map((item, index) => (
              <div
                key={item.step}
                className={`demo__step ${item.isHuman ? 'demo__step--human' : ''}`}
                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className="demo__step-node">
                  <span className="demo__step-num">{item.step}</span>
                </div>
                <div className="demo__step-content">
                  <span className="demo__step-action">{item.action}</span>
                  <span className="demo__step-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="demo__group-labels">
            <span className="demo__group-label">AI 自主执行</span>
            <span className="demo__group-label demo__group-label--human">人类参与</span>
          </div>
        </div>
      </div>
    </section>
  );
}
