import { useState } from 'react';
import { Sparkles, Wrench, Bug, AlertTriangle, ChevronDown } from 'lucide-react';
import { changelogData, ChangeType, ChangeItem, ChangelogEntry } from './changelogData';
import './Changelog.scss';

// 根据类型返回对应图标
function getTypeIcon(type: ChangeType) {
  switch (type) {
    case 'feature':
      return <Sparkles size={14} />;
    case 'improvement':
      return <Wrench size={14} />;
    case 'fix':
      return <Bug size={14} />;
    case 'breaking':
      return <AlertTriangle size={14} />;
  }
}

// 根据类型返回标签文本
function getTypeLabel(type: ChangeType) {
  switch (type) {
    case 'feature':
      return '新功能';
    case 'improvement':
      return '改进';
    case 'fix':
      return '修复';
    case 'breaking':
      return '破坏性变更';
  }
}

// 单个更新项组件
function ChangeItemCard({ change }: { change: ChangeItem }) {
  return (
    <div className={`changelog-item changelog-item--${change.type}`}>
      <div className="changelog-item__header">
        <span className={`changelog-item__tag changelog-item__tag--${change.type}`}>
          {getTypeIcon(change.type)}
          {getTypeLabel(change.type)}
        </span>
        <h4 className="changelog-item__title">{change.title}</h4>
      </div>
      
      {change.description && (
        <p className="changelog-item__desc">{change.description}</p>
      )}
      
      {change.items && change.items.length > 0 && (
        <ul className="changelog-item__list">
          {change.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 版本条目组件
function VersionEntry({ entry, isLatest }: { entry: ChangelogEntry; isLatest: boolean }) {
  const [expanded, setExpanded] = useState(isLatest);
  
  const formattedDate = new Date(entry.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={`changelog-entry ${expanded ? 'changelog-entry--expanded' : ''}`}>
      {/* 时间线节点 */}
      <div className="changelog-entry__timeline">
        <div className={`changelog-entry__dot ${isLatest ? 'changelog-entry__dot--latest' : ''}`} />
        <div className="changelog-entry__line" />
      </div>
      
      {/* 内容区域 */}
      <div className="changelog-entry__content">
        {/* 头部 */}
        <header 
          className="changelog-entry__header"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="changelog-entry__meta">
            <span className="changelog-entry__version">v{entry.version}</span>
            {isLatest && <span className="changelog-entry__badge">最新</span>}
            <time className="changelog-entry__date">{formattedDate}</time>
          </div>
          
          {entry.title && (
            <h2 className="changelog-entry__title">{entry.title}</h2>
          )}
          
          <ChevronDown 
            className={`changelog-entry__toggle ${expanded ? 'changelog-entry__toggle--expanded' : ''}`} 
            size={20} 
          />
        </header>
        
        {/* 详细内容 */}
        {expanded && (
          <div className="changelog-entry__body">
            {entry.sections.map((section, sectionIndex) => (
              <section key={sectionIndex} className="changelog-section">
                <h3 className="changelog-section__title">{section.title}</h3>
                <div className="changelog-section__items">
                  {section.changes.map((change, changeIndex) => (
                    <ChangeItemCard key={changeIndex} change={change} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Changelog() {
  return (
    <div className="changelog">
      <div className="changelog__container">
        {/* 页面标题 */}
        <header className="changelog__header">
          <h1 className="changelog__title">更新日志</h1>
          <p className="changelog__subtitle">
            追踪 VCoder 的每一次进化，了解新功能、改进和修复
          </p>
        </header>
        
        {/* 版本列表 */}
        <div className="changelog__list">
          {changelogData.map((entry, index) => (
            <VersionEntry 
              key={entry.version} 
              entry={entry} 
              isLatest={index === 0}
            />
          ))}
        </div>
        
        {/* 底部提示 */}
        <footer className="changelog__footer">
          <p>更早的版本记录请查看 <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub Releases</a></p>
        </footer>
      </div>
    </div>
  );
}
