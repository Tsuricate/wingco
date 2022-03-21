import { Center, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import AccountPanel from '../../components/AccountPanel';
import Button from '../../components/Button';
import PageLayout from '../../components/layout/PageLayout';
import PlayerAvatar from '../../components/PlayerAvatar';
import { panels } from '../../data/account';

const Account: React.FC = () => {
  const { t } = useTranslation(['account', 'common']);

  const handleSignOut = () => {
    console.log('Sign out button was clicked!');
  };
  return (
    <PageLayout title={t('account:title')}>
      <Stack spacing={8}>
        <Stack as={Center}>
          <PlayerAvatar playerName="Lorem Ipsum" direction="column" avatarSize="lg" />
          <Button dataCy="signOut" onClick={handleSignOut}>
            {t('common:signOut')}
          </Button>
        </Stack>

        <Stack>
          {panels.map((panel) => {
            return (
              <AccountPanel
                key={panel.title}
                title={t(panel.title)}
                background={panel.background}
                url={panel.url}
              />
            );
          })}
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default Account;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['account', 'common'])),
  },
});
