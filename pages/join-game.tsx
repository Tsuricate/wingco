import { Avatar, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Button from '../components/Button';
import FormControl from '../components/FormControl';
import FormLayout from '../components/layout/FormLayout';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';

const JoinGame: React.FC = () => {
  const { t } = useTranslation(['joinGame', 'common']);

  const handleClick = () => {
    console.log('Join game!');
  };

  return (
    <PageLayout title={t('title')}>
      <FormLayout>
        <Text>{t('description', { ns: 'joinGame' })}</Text>
        <Link href="/sign-in" asButton>
          {t('signIn', { ns: 'common' })}
        </Link>
        <Stack direction="row" align="center">
          <Avatar name="Lorem Ipsum" data-cy="avatarSelector" />
          <FormControl
            id="username"
            name="username"
            label={t('usernameLabel', { ns: 'common' })}
            helperText={t('usernameHelperText', { ns: 'common' })}
          />
        </Stack>
        <FormControl
          id="gameId"
          name="gameId"
          label={t('gameIdLabel', { ns: 'joinGame' })}
          helperText={t('gameIdHelperText', { ns: 'joinGame' })}
        />
        <Button type="submit" dataCy="submitButton" onClick={handleClick}>
          {t('join')}
        </Button>
      </FormLayout>
    </PageLayout>
  );
};

export default JoinGame;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['joinGame', 'common'])),
  },
});
