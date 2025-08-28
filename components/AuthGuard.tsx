import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from '../redux/actions/auth';
import { RootState } from '../redux/reducers';
import { setRedirection } from '../utils/redirection';
import PageLayout from './layout/PageLayout';
import { Spinner } from '@chakra-ui/react';

interface AuthGuardProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLogged } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // check token validity
    dispatch(checkToken());
    // If there is no user
    if (!isLoading) {
      if (!isLogged) {
        // remember the page that user tried to access
        setRedirection('sign_in_redirect', router.route);
        // and redirect
        router.push('/sign-in?unauthorized=true');
      }
    }
  }, [dispatch, isLoading, isLogged, router]);

  if (isLoading) {
    return (
      <PageLayout title={t('common:loading')}>
        <Spinner size="sm" />
      </PageLayout>
    );
  }

  if (isLogged) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
};

export default AuthGuard;
