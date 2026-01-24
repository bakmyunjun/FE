import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import Loader from '@/components/Loader';

export default function RequireAuth() {
  const { user, initialized } = useAuthStore();

  if (!initialized) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
