import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import './Download.scss';

const platforms = [
  { name: 'Windows', available: true },
  { name: 'macOS', available: true },
  { name: 'Linux', available: true },
];

export default function Download() {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <section 
      className={`download snap-section ${isVisible ? 'download--visible is-visible' : ''}`} 
      id="download"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="download__container">
        <div className="download__content">
          <div className="download__text">
            <h2 className="download__title">开启协同创造</h2>
            <p className="download__desc">选择你的平台，体验 AI 与人类协同的新方式</p>
          </div>
          
          <div className="download__actions">
            {platforms.map((platform) => (
              <button 
                key={platform.name}
                className="download__btn"
                disabled={!platform.available}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
