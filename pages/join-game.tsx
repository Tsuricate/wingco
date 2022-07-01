import { Avatar, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
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
  const { id, isLogged } = useSelector((state: RootState) => state.auth);
  const { gameSlug } = useSelector((state: RootState) => state.joinGame);
  const [requestAnswer, setRequestAnswer] = useState<boolean | undefined>(undefined);
  const [hostName, setHostName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe(`game-${gameSlug}`);

    channel.bind(
      `answer-join-request-player${id}`,
      (data: { answerToRequest: boolean; hostName: string }) => {
        const { answerToRequest: isRequestAccepted, hostName } = data;
        setRequestAnswer(isRequestAccepted);
        setHostName(hostName);
      }
    );

    return () => {
      pusher.unsubscribe(`answer-join-request-player${id}`);
    };
  });

  const updateField = (value: string, name: string) => {
    dispatch(updateJoinGameSlug(value, name));
  };

  const handleSubmit = () => {
    dispatch(joinGameRequest());
  };

  const hasReceivedAnswer = requestAnswer !== undefined;
  const answerStatus = requestAnswer ? 'success' : 'error';
  const answerMessage = requestAnswer
    ? t('joinGame:requestAccepted', { hostName })
    : t('joinGame:requestDeclined', { hostName });

  return (
    <PageLayout title={t('joinGame:title')}>
      {hasReceivedAnswer && <AlertMessage status={answerStatus}>{answerMessage}</AlertMessage>}
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
