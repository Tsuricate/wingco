import { Center, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useSelector } from 'react-redux';
import AccountPanel from '../../components/AccountPanel';
import Button from '../../components/Button';
import PageLayout from '../../components/layout/PageLayout';
import PlayerAvatar from '../../components/PlayerAvatar';
import { panels } from '../../data/account';
import { RootState } from '../../redux/reducers';

const Account: React.FC = () => {
  const { t } = useTranslation(['account', 'common']);
  const { name, avatar } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    console.log('Sign out button was clicked!');
  };
  return (
    <PageLayout title={t('account:title')}>
      <Stack spacing={8}>
        <Stack as={Center}>
          <PlayerAvatar playerName={name} avatar={avatar?.url} direction="column" avatarSize="lg" />
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
