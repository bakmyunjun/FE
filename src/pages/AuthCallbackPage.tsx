import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeOAuthToken } from '@/apis/auth';
import { useAuthStore } from '@/stores/authStore';

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
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (hasRequestedRef.current) return;
    hasRequestedRef.current = true;

    const { code, state } = getOAuthParams();

    if (!code || !state) {
      console.error('[OAuth][AuthCallback] code 또는 state 누락');
      navigate('/login', { replace: true });
      return;
    }

    const exchangeToken = async () => {
      try {
        const { user, tokens } = await exchangeOAuthToken({ code, state });

        login({ user, tokens });
        navigate('/', { replace: true });
      } catch (error) {
        console.error('[OAuth][AuthCallback] 토큰 교환 실패', error);
        navigate('/login', { replace: true });
      }
    };

    exchangeToken();
  }, [navigate, login]);

  return (
    <div className="flex h-screen items-center justify-center">
      로그인 처리 중...
    </div>
  );
}
