'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await checkSession();

      if (session) {
        try {
          const user = await getMe(); // отримуємо користувача окремо
          if (user) {
            setUser(user);
          }
        } catch {
          clearIsAuthenticated();
        }
      } else {
        clearIsAuthenticated();
      }

      setLoading(false);
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
