import { NavLink } from 'react-router-dom';
import { docsConfig } from './docsConfig';
import './DocsSidebar.scss';

interface DocsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
  return (
    <>
      {/* 移动端遮罩 */}
      {isOpen && <div className="docs-sidebar__overlay" onClick={onClose} />}
      
      <aside className={`docs-sidebar ${isOpen ? 'docs-sidebar--open' : ''}`}>
        <nav className="docs-sidebar__nav">
          {docsConfig.map((section) => (
            <div key={section.title} className="docs-sidebar__section">
              <h3 className="docs-sidebar__section-title">{section.title}</h3>
              <ul className="docs-sidebar__list">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <NavLink
                      to={`/docs/${item.slug}`}
                      className={({ isActive }) =>
                        `docs-sidebar__link ${isActive ? 'docs-sidebar__link--active' : ''}`
                      }
                      onClick={onClose}
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
