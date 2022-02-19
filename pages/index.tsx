import { Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from '../components/Link';
import PageLayout from '../components/PageLayout';

const Home: NextPage = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <PageLayout title={t('title', { ns: 'home' })}>
      <Stack spacing={{ base: 10 }}>
        <Text>{t('description', { ns: 'home' })}</Text>
        <Link href="/sign-in">{t('signIn', { ns: 'common' })}</Link>
        <Link href="/new-game">{t('newGameAsGuest', { ns: 'common' })}</Link>
        <Link href="/join-game">{t('joinGame', { ns: 'common' })}</Link>
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
