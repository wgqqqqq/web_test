import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import RubiksCube3D from './RubiksCube3D';
import './Hero.scss';

export default function Hero() {
  const [explodeProgress, setExplodeProgress] = useState(0);

  // 处理内部链接点击
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 500;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setExplodeProgress(progress);
    };

    // 延迟初始化，确保路由切换时的 scrollTo(0, 0) 先生效
    const initTimer = requestAnimationFrame(() => {
      handleScroll();
    });
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      cancelAnimationFrame(initTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="hero snap-section" id="hero">
      {/* 魔方作为全屏背景 */}
      <div className="hero__cube-bg">
        <RubiksCube3D explodeProgress={explodeProgress} />
      </div>

      {/* 首屏 - 文字和魔方 */}
      <div className="hero__intro">
        <div className="hero__text">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="hero__title">VCoder</h1>
            <p className="hero__subtitle">AI 与人类协同创造软件新范式</p>
          </motion.div>

          <motion.div 
            className="hero__actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a 
              href="#download" 
              className="hero__btn-primary"
              onClick={(e) => handleNavClick(e, 'download')}
            >
              立即下载
            </a>
            <a 
              href="#demo" 
              className="hero__btn-ghost"
              onClick={(e) => handleNavClick(e, 'demo')}
            >
              了解更多
            </a>
          </motion.div>
        </div>
      </div>

      {/* 产品展示 - 在首屏下方 */}
      <motion.div 
        className="hero__product"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="hero__product-frame">
          <img 
            src={`${import.meta.env.BASE_URL}product-view.png`}
            alt="VCoder 产品界面" 
            className="hero__product-image"
          />
        </div>
      </motion.div>
    </section>
  );
}
