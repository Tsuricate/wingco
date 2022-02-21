import { Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from '../components/Link';
import PageLayout from '../components/layout/PageLayout';

const Home: NextPage = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <PageLayout title={t('title', { ns: 'home' })}>
      <Stack spacing={{ base: 10 }}>
        <Text>{t('description', { ns: 'home' })}</Text>
        <Link href="/sign-in" asButton>
          {t('signIn', { ns: 'common' })}
        </Link>
        <Link href="/new-game" asButton>
          {t('newGameAsGuest', { ns: 'common' })}
        </Link>
        <Link href="/join-game" asButton>
          {t('joinGame', { ns: 'common' })}
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
