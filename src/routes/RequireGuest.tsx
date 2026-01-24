import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import Loader from '@/components/Loader';

export default function RequireGuest() {
  const { user, initialized } = useAuthStore();

  if (!initialized) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
