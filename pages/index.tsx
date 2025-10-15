import { Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from '../components/Link';
import PageLayout from '../components/layout/PageLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { useRouter } from 'next/router';
import AlertMessage from '../components/AlertMessage';
import Button from '../components/Button';

const Home: NextPage = () => {
  const { isLogged } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation(['home', 'common', 'manageAccount']);
  const router = useRouter();
  const { accountDeleted } = router.query;

  return (
    <PageLayout title={t('home:title')}>
      {accountDeleted && <AlertMessage status="info" description={t('manageAccount:accountDeleted')} />}
      <Stack>
        <Text>{t('home:description')}</Text>
        {!isLogged && (
          <Button variant="solid" onClick={() => router.push('/sign-in')}>
            {t('common:signIn')}
          </Button>
        )}
        <Button variant="solid" onClick={() => router.push('/join-game')}>
          {t('common:joinGame')}
        </Button>
        {isLogged && (
          <>
            <Button variant="solid" onClick={() => router.push('/new-game')}>
              {t('common:newGame')}
            </Button>
            <Button variant="solid" onClick={() => router.push('/account')}>
              {t('common:myAccount')}
            </Button>
          </>
        )}
      </Stack>
    </PageLayout>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['home', 'common', 'manageAccount'])),
  },
});
