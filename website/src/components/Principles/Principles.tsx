import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import './Principles.scss';

const principles = [
  {
    number: '01',
    title: '智能体驱动',
    subtitle: '释放创造力',
    description: 'AI 自主规划与执行，人类专注创意与决策。',
  },
  {
    number: '02',
    title: '全程可观测',
    subtitle: '每步可追溯',
    description: '所有 AI 行为透明可见，决策有据可查，过程完整留痕。',
  },
  {
    number: '03',
    title: '工程同构',
    subtitle: '上下文透明可控',
    description: '完整理解项目架构与规范，生成代码天然融入工程。',
  },
];

export default function Principles() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section 
      className={`principles snap-section ${isVisible ? 'principles--visible is-visible' : ''}`} 
      id="principles"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="principles__container">
        <div className="principles__header">
          <h2 className="principles__title">设计哲学</h2>
        </div>

        <div className="principles__grid">
          {principles.map((item, index) => (
            <div
              key={item.number}
              className="principles__card"
              style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <span className="principles__card-number">{item.number}</span>
              <h3 className="principles__card-title">{item.title}</h3>
              <span className="principles__card-subtitle">{item.subtitle}</span>
              <p className="principles__card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
