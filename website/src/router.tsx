import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import { DocsLayout, DocPage } from './pages/Docs';
import Changelog from './pages/Changelog';
import Blog, { BlogPost } from './pages/Blog';
import DownloadPage from './pages/Download';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'docs',
        element: <DocsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/docs/introduction" replace />,
          },
          {
            path: ':slug',
            element: <DocPage />,
          },
        ],
      },
      {
        path: 'changelog',
        element: <Changelog />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
      },
      {
        path: 'download',
        element: <DownloadPage />,
      },
    ],
  },
], { basename: import.meta.env.BASE_URL });
