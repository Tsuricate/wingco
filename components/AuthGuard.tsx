import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { setRedirection } from '../utils/redirection';
import PageLayout from './layout/PageLayout';
import Loader from './Loader';

interface AuthGuardProps {
  isLoading: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, isLoading }) => {
  const { t } = useTranslation();
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
    return (
      <PageLayout title={t('common:loading')}>
        <Loader />
      </PageLayout>
    );
  }

  if (id) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
};

export default AuthGuard;
