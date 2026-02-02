import { useState, useEffect, useCallback } from 'react';
import Hero from '@/components/Hero/Hero';
import CodeDemo from '@/components/CodeDemo/CodeDemo';
import Principles from '@/components/Principles/Principles';
import Pillars from '@/components/Pillars/Pillars';
import Download from '@/components/Download/Download';
import './Home.scss';

// 章节配置
const SECTIONS = [
  { id: 'hero', label: '首页' },
  { id: 'demo', label: '演示' },
  { id: 'principles', label: '理念' },
  { id: 'pillars', label: '能力' },
  { id: 'download', label: '下载' },
];

// 滚动导航点组件
function ScrollNav({
  currentIndex,
  onNavigate,
}: {
  currentIndex: number;
  onNavigate: (index: number) => void;
}) {
  return (
    <nav className="scroll-nav" aria-label="页面导航">
      {SECTIONS.map((section, index) => (
        <button
          key={section.id}
          className={`scroll-nav__dot ${index === currentIndex ? 'is-active' : ''}`}
          data-label={section.label}
          onClick={() => onNavigate(index)}
          aria-label={`跳转到${section.label}`}
          aria-current={index === currentIndex ? 'true' : undefined}
        />
      ))}
    </nav>
  );
}

// 滚动进度条组件
function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="scroll-progress">
      <div
        className="scroll-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 滚动到指定章节
  const scrollToSection = useCallback((index: number) => {
    const section = document.getElementById(SECTIONS[index].id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // 监听滚动更新状态
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // 计算滚动进度
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      
      // 计算当前章节
      const viewportHeight = window.innerHeight;
      let newIndex = 0;
      
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= viewportHeight * 0.3) {
            newIndex = i;
            break;
          }
        }
      }
      
      setCurrentIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentIndex < SECTIONS.length - 1) {
            scrollToSection(currentIndex + 1);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentIndex > 0) {
            scrollToSection(currentIndex - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(SECTIONS.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, scrollToSection]);

  return (
    <div className="home">
      {/* 滚动进度条 */}
      <ScrollProgress progress={scrollProgress} />
      
      {/* 滚动导航指示器 */}
      <ScrollNav currentIndex={currentIndex} onNavigate={scrollToSection} />
      
      {/* 1. 品牌首屏 + 产品展示 */}
      <Hero />
      
      {/* 2. 工作流程 - 怎么用 */}
      <CodeDemo />
      
      {/* 3. 核心理念 - 为什么这么设计 */}
      <Principles />
      
      {/* 4. 核心能力 - 有哪些能力 */}
      <Pillars />
      
      {/* 5. 行动召唤 - 立即获取 */}
      <Download />
    </div>
  );
}
