import { Avatar, Center, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import AccountPanel, { AccountPanelProps } from '../../components/AccountPanel';
import Button from '../../components/Button';
import PageLayout from '../../components/layout/PageLayout';

const Account: React.FC = () => {
  const { t } = useTranslation(['account', 'common']);

  const panels: Array<AccountPanelProps> = [
    {
      title: 'createGame',
      background: 'blackAlpha.50',
      url: '/new-game',
    },
    {
      title: 'statistics',
      background: 'blackAlpha.100',
      url: '/account/statistics',
    },
    {
      title: 'gameHistory',
      background: 'blackAlpha.200',
      url: '/account/game-history',
    },
    {
      title: 'manageAccount',
      background: 'blackAlpha.300',
      url: '/account/manage',
    },
  ];

  const handleSignOut = () => {
    console.log('Sign out button was clicked!');
  };
  return (
    <PageLayout title={t('title', { ns: 'account' })}>
      <Stack spacing={8}>
        <Stack as={Center}>
          <Avatar name="Lorem Ipsum" size="lg" />
          <Text>Lorem Ipsum</Text>
          <Button dataCy="signOut" onClick={handleSignOut}>
            {t('signOut', { ns: 'common' })}
          </Button>
        </Stack>

        <Stack>
          {panels.map((panel) => {
            return (
              <AccountPanel
                key={panel.title}
                title={t(panel.title, { ns: 'account' })}
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
