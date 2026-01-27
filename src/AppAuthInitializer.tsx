import { useEffect, type ReactNode } from 'react';
import { useMe } from '@/hooks/queries/useMe';
import { useAuthStore } from '@/stores/authStore';
import Loader from '@/components/Loader';

export default function AppAuthInitializer({
  children,
}: {
  children: ReactNode;
}) {
  const { data: me, isLoading: isMeLoading } = useMe();
  const { login, setInitialized } = useAuthStore();

  useEffect(() => {
    if (!isMeLoading) {
      if (me) login(me);
      setInitialized();
    }
  }, [isMeLoading]);

  if (isMeLoading) {
    return <Loader />;
  }

  return children;
}
