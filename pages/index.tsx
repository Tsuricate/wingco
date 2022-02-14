import { Heading, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import PageLayout from '../components/PageLayout';

const Home: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <PageLayout title="WingCo">
      <Stack spacing={{ base: 10 }}>
        <Heading as="h1">Wingspan Companion</Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nostrum ipsam repudiandae
          numquam libero temporibus magni ut, nihil explicabo minus quis quo. Modi quod distinctio
          placeat ipsum consequatur dolorum maxime facere labore in vitae ipsam at itaque, dolor
          dolorem ex facilis sapiente. Dolore facilis doloremque magnam soluta fugit hic culpa.
        </Text>
        <Link href="/sign-in">Log in / Sign up</Link>
        <Link href="/new-game">{t('guest')}</Link>
        <Link href="/join-game">Join existing game</Link>
      </Stack>
    </PageLayout>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
