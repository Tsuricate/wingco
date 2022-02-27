import { Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from '../components/Link';
import PageLayout from '../components/layout/PageLayout';

const Home: NextPage = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <PageLayout title={t('home:title')}>
      <Stack spacing={{ base: 10 }}>
        <Text>{t('home:description')}</Text>
        <Link href="/sign-in" asButton>
          {t('common:signIn')}
        </Link>
        <Link href="/new-game" asButton>
          {t('common:newGameAsGuest')}
        </Link>
        <Link href="/join-game" asButton>
          {t('common:joinGame')}
        </Link>
      </Stack>
    </PageLayout>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['home', 'common'])),
  },
});
