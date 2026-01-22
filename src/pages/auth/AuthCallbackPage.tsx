import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthLogin } from '@/hooks/mutations/useOAuthLogin';
import { toast } from 'sonner';
import Loader from '@/components/Loader';

function getOAuthParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    code: params.get('code'),
    state: params.get('state'),
  };
}

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const hasRequestedRef = useRef(false);
  const { mutate: oauthLogin } = useOAuthLogin({
    onSuccess: () => {
      navigate('/', { replace: true });
    },
    onError: () => {
      console.error('[OAuth][AuthCallback] 토큰 교환 실패');
      toast.error('로그인에 실패했습니다.', {
        position: 'top-center',
      });
      navigate('/login', { replace: true });
    },
  });

  useEffect(() => {
    if (hasRequestedRef.current) return;
    hasRequestedRef.current = true;

    const { code, state } = getOAuthParams();

    if (!code || !state) {
      console.error('[OAuth][AuthCallback] code 또는 state 누락');
      navigate('/login', { replace: true });
      return;
    }

    oauthLogin({ code, state });
  }, [navigate, oauthLogin]);

  return <Loader />;
}
