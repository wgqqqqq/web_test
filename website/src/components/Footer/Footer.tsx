import './Footer.scss';

const links = [
  { label: '文档', href: '#docs' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: '更新日志', href: '#changelog' },
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
            <a 
              key={link.label} 
              href={link.href}
              className="footer__link"
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
