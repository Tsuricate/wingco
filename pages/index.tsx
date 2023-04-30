import { Box, Heading, Stack, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from '../components/Link';
// import PageLayout from '../components/layout/PageLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { useRouter } from 'next/router';
import AlertMessage from '../components/AlertMessage';

const Home: NextPage = () => {
  const { isLogged } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation(['home', 'common', 'manageAccount']);
  const router = useRouter();
  const { accountDeleted } = router.query;

  return (
    <Box padding={10}>
      {accountDeleted && <AlertMessage status="info">{t('manageAccount:accountDeleted')}</AlertMessage>}
      <Stack spacing={{ base: 10 }}>
        <Heading textAlign="center" fontWeight={400} fontSize={55}>
          {t('home:description')}
        </Heading>
        {!isLogged && (
          <>
            <Button variant="test">Lalalala</Button>
            <Link href="/sign-in" asButton buttonVariant="variantTest">
              {t('common:signIn')}
            </Link>
          </>
        )}
        <Link href="/new-game" asButton>
          {!isLogged ? t('common:newGameAsGuest') : t('common:newGame')}
        </Link>
        <Link href="/join-game" asButton>
          {t('common:joinGame')}
        </Link>
      </Stack>
    </Box>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['home', 'common', 'manageAccount'])),
  },
});
