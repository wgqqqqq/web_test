import { useMemo } from 'react';
import { Monitor, Apple, Terminal, Download as DownloadIcon, CheckCircle, Info } from 'lucide-react';
import './Download.scss';

type PlatformType = 'windows' | 'macos' | 'linux' | 'unknown';

// 检测当前操作系统
function detectOS(): PlatformType {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  
  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }
  if (platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os')) {
    return 'macos';
  }
  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'linux';
  }
  return 'unknown';
}

interface PlatformInfo {
  id: PlatformType;
  name: string;
  icon: React.ReactNode;
  versions: {
    arch: string;
    size: string;
    url: string;
  }[];
  requirements: string[];
}

const platforms: PlatformInfo[] = [
  {
    id: 'windows',
    name: 'Windows',
    icon: <Monitor size={32} />,
    versions: [
      { arch: 'x64', size: '85 MB', url: '#' },
      { arch: 'arm64', size: '82 MB', url: '#' },
    ],
    requirements: [
      'Windows 10 (1809) 或更高版本',
      '64 位处理器',
      '4 GB RAM（建议 8 GB）',
      '500 MB 可用磁盘空间',
    ],
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: <Apple size={32} />,
    versions: [
      { arch: 'Apple Silicon', size: '78 MB', url: '#' },
      { arch: 'Intel', size: '82 MB', url: '#' },
    ],
    requirements: [
      'macOS 11 (Big Sur) 或更高版本',
      'Apple Silicon 或 Intel 处理器',
      '4 GB RAM（建议 8 GB）',
      '500 MB 可用磁盘空间',
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: <Terminal size={32} />,
    versions: [
      { arch: 'x64 (.deb)', size: '80 MB', url: '#' },
      { arch: 'x64 (.AppImage)', size: '85 MB', url: '#' },
    ],
    requirements: [
      'Ubuntu 20.04+ / Fedora 35+ / Debian 11+',
      '64 位处理器',
      '4 GB RAM（建议 8 GB）',
      '500 MB 可用磁盘空间',
      'GTK 3.0+ 和 WebKit2GTK 4.0+',
    ],
  },
];

const currentVersion = '0.2.0';
const releaseDate = '2025年12月31日';

function PlatformCard({ platform, isCurrentOS }: { platform: PlatformInfo; isCurrentOS: boolean }) {
  return (
    <div className={`platform-card ${isCurrentOS ? 'platform-card--current' : ''}`}>
      <div className="platform-card__header">
        <div className="platform-card__icon">{platform.icon}</div>
        <h3 className="platform-card__name">{platform.name}</h3>
        {isCurrentOS && <span className="platform-card__badge">当前系统</span>}
      </div>
      
      <div className="platform-card__downloads">
        {platform.versions.map((version) => (
          <a 
            key={version.arch} 
            href={version.url} 
            className="platform-card__download-btn"
          >
            <DownloadIcon size={16} />
            <span className="platform-card__arch">{version.arch}</span>
            <span className="platform-card__size">{version.size}</span>
          </a>
        ))}
      </div>
      
      <div className="platform-card__requirements">
        <h4 className="platform-card__requirements-title">
          <Info size={14} />
          系统要求
        </h4>
        <ul className="platform-card__requirements-list">
          {platform.requirements.map((req, index) => (
            <li key={index}>
              <CheckCircle size={12} />
              {req}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  const currentOS = useMemo(() => detectOS(), []);
  
  // 将当前系统排在第一位
  const sortedPlatforms = useMemo(() => {
    const current = platforms.find(p => p.id === currentOS);
    const others = platforms.filter(p => p.id !== currentOS);
    return current ? [current, ...others] : platforms;
  }, [currentOS]);
  
  return (
    <div className="download-page">
      <div className="download-page__container">
        {/* 页面标题 */}
        <header className="download-page__header">
          <h1 className="download-page__title">下载 <strong>VCoder</strong></h1>
          <p className="download-page__subtitle">
            选择你的平台，开始 AI 协同编程之旅
          </p>
          <div className="download-page__version-info">
            <span className="download-page__version">v{currentVersion}</span>
            <span className="download-page__date">发布于 {releaseDate}</span>
          </div>
        </header>
        
        {/* 平台选择 */}
        <section className="download-page__platforms">
          {sortedPlatforms.map((platform) => (
            <PlatformCard 
              key={platform.id} 
              platform={platform} 
              isCurrentOS={platform.id === currentOS}
            />
          ))}
        </section>
        
        {/* 其他安装方式 */}
        <section className="download-page__alternatives">
          <h2 className="download-page__section-title">其他安装方式</h2>
          
          <div className="download-page__alt-grid">
            <div className="alt-card">
              <h3 className="alt-card__title">包管理器</h3>
              <div className="alt-card__commands">
                <div className="alt-card__command">
                  <span className="alt-card__label">Homebrew (macOS)</span>
                  <code>brew install vcoder</code>
                </div>
                <div className="alt-card__command">
                  <span className="alt-card__label">Scoop (Windows)</span>
                  <code>scoop install vcoder</code>
                </div>
              </div>
            </div>
            
            <div className="alt-card">
              <h3 className="alt-card__title">历史版本</h3>
              <p className="alt-card__desc">
                需要特定版本？查看所有历史版本和更新日志。
              </p>
              <a href="https://github.com" className="alt-card__link">
                GitHub Releases →
              </a>
            </div>
          </div>
        </section>
        
        {/* 安装后 */}
        <section className="download-page__next-steps">
          <h2 className="download-page__section-title">安装后</h2>
          <div className="next-steps">
            <div className="next-step">
              <span className="next-step__number">1</span>
              <div className="next-step__content">
                <h3>配置 AI 模型</h3>
                <p>设置你的 API 密钥，连接 OpenAI、Claude 或其他支持的模型。</p>
              </div>
            </div>
            <div className="next-step">
              <span className="next-step__number">2</span>
              <div className="next-step__content">
                <h3>打开项目</h3>
                <p>选择一个现有项目或创建新项目，VCoder 会自动分析项目结构。</p>
              </div>
            </div>
            <div className="next-step">
              <span className="next-step__number">3</span>
              <div className="next-step__content">
                <h3>开始对话</h3>
                <p>用自然语言描述你的需求，让 AI 帮你完成编程任务。</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
