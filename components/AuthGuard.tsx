import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { setRedirection } from '../utils/redirection';

const AuthGuard: React.FC = ({ children }) => {
  const { id } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // If there is no user
    if (!id) {
      // remember the page that user tried to access
      setRedirection('sign_in_redirect', router.route);
      // and redirect
      router.push('/sign-in?unauthorized=true');
    }
  }, [router, id]);

  if (id) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
};

export default AuthGuard;
