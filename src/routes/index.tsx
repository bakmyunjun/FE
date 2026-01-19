import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Layout from '@/routes/Layout';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallbackPage />,
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

  {
    path: 'interview',
    lazy: async () => {
      const { default: InterviewPage } = await import('@/pages/InterviewPage');
      return { element: <InterviewPage /> };
    },
  },
]);
