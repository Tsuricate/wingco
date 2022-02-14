import { Heading, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import PageLayout from '../components/PageLayout';

const Home: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <PageLayout title="WingCo">
      <Stack spacing={{ base: 10 }}>
        <Heading as="h1">{t('title')}</Heading>
        <Text>{t('description')}</Text>
        <Link href="/sign-in">{t('signIn')}</Link>
        <Link href="/new-game">{t('newGameAsGuest')}</Link>
        <Link href="/join-game">{t('joinGame')}</Link>
      </Stack>
    </PageLayout>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['home'])),
  },
});
