import { Avatar, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import Form from '../components/Form';
import FormControl from '../components/FormControl';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import { joinGameRequest, updateJoinGameSlug } from '../redux/actions/joinGame';
import { RootState } from '../redux/reducers';

const JoinGame: React.FC = () => {
  const { t } = useTranslation(['joinGame', 'common']);
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state: RootState) => state.auth);
  const { gameSlug } = useSelector((state: RootState) => state.joinGame);

  const updateField = (value: string, name: string) => {
    dispatch(updateJoinGameSlug(value, name));
  };

  const handleSubmit = () => {
    dispatch(joinGameRequest());
  };

  return (
    <PageLayout title={t('joinGame:title')}>
      <Form onSubmit={handleSubmit}>
        <Text>{t('joinGame:description')}</Text>
        {!isLogged && (
          <>
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
          </>
        )}
        <FormControl
          id="gameSlug"
          name="gameSlug"
          label={t('joinGame:gameIdLabel')}
          helperText={t('joinGame:gameIdHelperText')}
          value={gameSlug}
          updateField={updateField}
        />
        <Button type="submit" dataCy="submitButton">
          {t('joinGame:join')}
        </Button>
      </Form>
    </PageLayout>
  );
};

export default JoinGame;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['joinGame', 'common'])),
  },
});
