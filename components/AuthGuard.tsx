import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { setRedirection } from '../utils/redirection';

interface AuthGuardProps {
  isLoading: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, isLoading }) => {
  const { id } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // If there is no user
    if (!isLoading) {
      if (!id) {
        // remember the page that user tried to access
        setRedirection('sign_in_redirect', router.route);
        // and redirect
        router.push('/sign-in?unauthorized=true');
      }
    }
  }, [id, isLoading, router]);

  if (isLoading) {
    return <h1>Application loading</h1>;
  }

  if (id) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
};

export default AuthGuard;
