import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, ChevronRight } from 'lucide-react';
import CubeLogo from '../CubeLogo/CubeLogo';
import './Header.scss';

const navLinks = [
  { label: '文档', href: '/docs' },
  { label: '更新日志', href: '/changelog' },
  { label: '博客', href: '/blog' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <CubeLogo size={22} variant="compact" />
          <span className="header__logo-text">VCoder</span>
        </Link>

        {/* 右侧操作区 */}
        <div className="header__actions">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className={`header__nav-link ${location.pathname.startsWith(link.href) ? 'is-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="header__icon-btn"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          
          <Link to="/download" className="header__cta">
            <span>下载</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
