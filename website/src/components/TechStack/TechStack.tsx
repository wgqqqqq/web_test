import './TechStack.scss';

const techs = [
  { name: 'Tauri', version: '2.0' },
  { name: 'React', version: '19' },
  { name: 'Rust', version: '2021' },
  { name: 'TypeScript', version: '5.8' },
];

export default function TechStack() {
  return (
    <section className="tech">
      <div className="tech__container">
        <span className="tech__label">技术栈</span>
        <div className="tech__list">
          {techs.map((tech) => (
            <div key={tech.name} className="tech__item">
              <span className="tech__item-name">{tech.name}</span>
              <span className="tech__item-version">{tech.version}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
