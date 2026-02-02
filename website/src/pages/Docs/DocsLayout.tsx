import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import DocsSidebar from './DocsSidebar';
import './DocsLayout.scss';

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="docs-layout">
      {/* 移动端菜单按钮 */}
      <button 
        className="docs-layout__menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 侧边栏 */}
      <DocsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 主内容区 */}
      <main className="docs-layout__main">
        <Outlet />
      </main>
    </div>
  );
}
