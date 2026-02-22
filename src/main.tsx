import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.ts';
import { Toaster } from 'sonner';
import AppAuthInitializer from './AppAuthInitializer.tsx';
import ModalProvider from './providers/ModalProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppAuthInitializer>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </AppAuthInitializer>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
