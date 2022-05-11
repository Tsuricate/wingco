import { Center, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useSelector } from 'react-redux';
import AccountPanel from '../../components/AccountPanel';
import AvatarSelector from '../../components/AvatarSelector';
import PageLayout from '../../components/layout/PageLayout';
import Link from '../../components/Link';
import { panels } from '../../data/account';
import { NextPageWithAuth } from '../../models/pageWithAuth';
import { RootState } from '../../redux/reducers';

const Account: NextPageWithAuth = () => {
  const { t } = useTranslation(['account', 'common']);
  const { name, avatar } = useSelector((state: RootState) => state.auth);

  return (
    <PageLayout title={t('account:title')}>
      <Stack spacing={8}>
        <Stack as={Center}>
          <AvatarSelector avatarSize="xl" currentAvatar={avatar} />
          <Text fontWeight="bold" fontSize="xl">
            {name}
          </Text>
          <Link dataCy="signOut" href="/api/sign-out" isExternal>
            {t('common:signOut')}
          </Link>
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

Account.requireAuth = true;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['account', 'newGame', 'common'])),
  },
});
