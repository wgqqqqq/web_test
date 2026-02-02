import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

function App() {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith('/docs');

  // 路由切换时滚动到页面顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app">
      <Header />
      <main className={isDocsPage ? 'main--docs' : ''}>
        <Outlet />
      </main>
      {!isDocsPage && <Footer />}
    </div>
  );
}

export default App;
