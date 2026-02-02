import { useEffect, useState, useCallback, useRef } from 'react';

export interface Section {
  id: string;
  label: string;
}

export interface UseScrollSnapOptions {
  sections: Section[];
  /** 滚动容器的 ref，默认使用 document */
  containerRef?: React.RefObject<HTMLElement>;
  /** 触发切换的阈值 (0-1)，默认 0.5 */
  threshold?: number;
  /** 键盘导航 */
  enableKeyboard?: boolean;
  /** 滚动完成回调 */
  onSectionChange?: (index: number, section: Section) => void;
}

export interface UseScrollSnapReturn {
  /** 当前活动章节索引 */
  currentIndex: number;
  /** 滚动进度 (0-1) */
  scrollProgress: number;
  /** 跳转到指定章节 */
  scrollToSection: (index: number) => void;
  /** 下一章节 */
  nextSection: () => void;
  /** 上一章节 */
  prevSection: () => void;
  /** 章节可见性状态 */
  visibleSections: Set<string>;
}

export function useScrollSnap({
  sections,
  containerRef,
  threshold = 0.5,
  enableKeyboard = true,
  onSectionChange,
}: UseScrollSnapOptions): UseScrollSnapReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | undefined>(undefined);
  const lastIndexRef = useRef(0);

  // 获取滚动容器
  const getContainer = useCallback(() => {
    return containerRef?.current || document.querySelector('.scroll-container') as HTMLElement;
  }, [containerRef]);

  // 滚动到指定章节
  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length) return;
    
    const container = getContainer();
    const section = document.getElementById(sections[index].id);
    
    if (section && container) {
      isScrollingRef.current = true;
      
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      
      // 清除之前的超时
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // 滚动完成后重置状态
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    }
  }, [sections, getContainer]);

  // 下一章节
  const nextSection = useCallback(() => {
    if (currentIndex < sections.length - 1) {
      scrollToSection(currentIndex + 1);
    }
  }, [currentIndex, sections.length, scrollToSection]);

  // 上一章节
  const prevSection = useCallback(() => {
    if (currentIndex > 0) {
      scrollToSection(currentIndex - 1);
    }
  }, [currentIndex, scrollToSection]);

  // 监听滚动更新当前索引和进度
  useEffect(() => {
    const container = getContainer();
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      
      // 计算滚动进度
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      
      // 计算当前章节
      const viewportHeight = container.clientHeight;
      let newIndex = 0;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const relativeTop = rect.top - containerRect.top;
          
          if (relativeTop <= viewportHeight * threshold) {
            newIndex = i;
            break;
          }
        }
      }
      
      if (newIndex !== lastIndexRef.current) {
        lastIndexRef.current = newIndex;
        setCurrentIndex(newIndex);
        onSectionChange?.(newIndex, sections[newIndex]);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [sections, threshold, getContainer, onSectionChange]);

  // Intersection Observer 追踪可见章节
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(id);
            } else {
              newSet.delete(id);
            }
            return newSet;
          });
        },
        {
          root: getContainer(),
          threshold: 0.1,
        }
      );
      
      observer.observe(element);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [sections, getContainer]);

  // 键盘导航
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // 防止输入框中触发
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          nextSection();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevSection();
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sections.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboard, nextSection, prevSection, scrollToSection, sections.length]);

  // 清理
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentIndex,
    scrollProgress,
    scrollToSection,
    nextSection,
    prevSection,
    visibleSections,
  };
}

export default useScrollSnap;
