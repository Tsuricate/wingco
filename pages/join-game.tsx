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

  const updateField = () => {
    console.log('Update');
  };

  const handleClick = () => {
    console.log('Join game!');
  };

  return (
    <PageLayout title={t('joinGame:title')}>
      <FormLayout>
        <Text>{t('joinGame:description')}</Text>
        <Link href="/sign-in" asButton>
          {t('common:signIn')}
        </Link>
        <Stack direction="row" align="center">
          <Avatar name="Lorem Ipsum" data-cy="avatarSelector" />
          <FormControl
            id="username"
            name="username"
            label={t('common:usernameLabel')}
            helperText={t('common:usernameHelperText')}
            updateField={updateField}
          />
        </Stack>
        <FormControl
          id="gameId"
          name="gameId"
          label={t('joinGame:gameIdLabel')}
          helperText={t('joinGame:gameIdHelperText')}
          updateField={updateField}
        />
        <Button type="submit" dataCy="submitButton" onClick={handleClick}>
          {t('joinGame:join')}
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
