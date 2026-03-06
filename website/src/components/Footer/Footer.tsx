import { Link } from 'react-router-dom';
import './Footer.scss';

const links = [
  { label: '文档', to: '/docs' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: '更新日志', to: '/changelog' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <span className="footer__logo">VCoder</span>
          <span className="footer__copyright">© {year}</span>
        </div>
        
        <nav className="footer__links">
          {links.map((link) => (
            'href' in link ? (
              <a
                key={link.label}
                href={link.href}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.to} className="footer__link">
                {link.label}
              </Link>
            )
          ))}
        </nav>
      </div>
    </footer>
  );
}
