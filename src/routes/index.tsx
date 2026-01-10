import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Layout from '@/routes/Layout';

export const router = createBrowserRouter([
  {
    path: '/login',
    lazy: async () => {
      const { default: LoginPage } = await import('@/pages/LoginPage');
      return { element: <LoginPage /> };
    },
  },

  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'report/:id',
        lazy: async () => {
          const { default: Report } = await import('@/pages/ReportPage');
          return { element: <Report /> };
        },
      },
    ],
  },
]);
