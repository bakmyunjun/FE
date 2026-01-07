import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.ts';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
