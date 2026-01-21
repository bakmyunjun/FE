import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated } from '@/stores/authStore';

export default function RequireAuth() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace={true} />;
  }

  return <Outlet />;
}
