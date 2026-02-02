/**
 * 3D魔方Logo组件
 * 使用纯CSS 3D实现，线框风格
 */

import React, { useMemo } from 'react';
import './CubeLogo.scss';

export interface CubeLogoProps {
  /** 魔方尺寸（像素） */
  size?: number;
  /** 自定义类名 */
  className?: string;
  /** 变体：default-完整版 | compact-紧凑版（适合小尺寸） */
  variant?: 'default' | 'compact';
}

export const CubeLogo: React.FC<CubeLogoProps> = ({ 
  size = 100, 
  className = '', 
  variant = 'default'
}) => {
  const isCompact = variant === 'compact' || size < 50;

  const blockSize = size / 4;
  const gap = blockSize * 0.12;
  const actualSize = blockSize - gap;

  // 生成完整 3x3x3 方块
  const blocks = useMemo(() => {
    const result = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          result.push({ x, y, z, key: `${x}-${y}-${z}` });
        }
      }
    }
    return result;
  }, []);

  const renderBlock = (x: number, y: number, z: number, key: string) => {
    return (
      <div
        key={key}
        className="cube-logo__block"
        style={{
          width: actualSize,
          height: actualSize,
          transform: `translate3d(${x * blockSize}px, ${-y * blockSize}px, ${z * blockSize}px)`
        }}
      >
        <div className="cube-logo__face cube-logo__face--front" style={{ width: actualSize, height: actualSize, transform: `translateZ(${actualSize/2}px)` }} />
        <div className="cube-logo__face cube-logo__face--back" style={{ width: actualSize, height: actualSize, transform: `translateZ(${-actualSize/2}px) rotateY(180deg)` }} />
        <div className="cube-logo__face cube-logo__face--top" style={{ width: actualSize, height: actualSize, transform: `translateY(${-actualSize/2}px) rotateX(90deg)` }} />
        <div className="cube-logo__face cube-logo__face--bottom" style={{ width: actualSize, height: actualSize, transform: `translateY(${actualSize/2}px) rotateX(-90deg)` }} />
        <div className="cube-logo__face cube-logo__face--right" style={{ width: actualSize, height: actualSize, transform: `translateX(${actualSize/2}px) rotateY(90deg)` }} />
        <div className="cube-logo__face cube-logo__face--left" style={{ width: actualSize, height: actualSize, transform: `translateX(${-actualSize/2}px) rotateY(-90deg)` }} />
      </div>
    );
  };

  return (
    <div 
      className={`cube-logo ${isCompact ? 'cube-logo--compact' : ''} ${className}`}
      style={{ 
        width: size, 
        height: size,
        perspective: size * 3
      }}
    >
      <div className="cube-logo__scene">
        <div className="cube-logo__cube">
          {blocks.map(({ x, y, z, key }) => renderBlock(x, y, z, key))}
        </div>
      </div>
    </div>
  );
};

export default CubeLogo;
