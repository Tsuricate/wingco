import { Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import AvatarSelector from '../components/AvatarSelector';
import Button from '../components/Button';
import Form from '../components/Form';
import FormControl from '../components/FormControl';
import PageLayout from '../components/layout/PageLayout';
import Link from '../components/Link';
import { AvatarImage } from '../models/players';
import { joinGameRequest, updateGuestPlayerInfos, updateJoinGameSlug } from '../redux/actions/joinGame';
import { RootState } from '../redux/reducers';

const JoinGame: React.FC = () => {
  const { t } = useTranslation(['joinGame', 'newGame', 'common']);
  const dispatch = useDispatch();
  const { id, isLogged } = useSelector((state: RootState) => state.auth);
  const { gameSlug, guestPlayer } = useSelector((state: RootState) => state.joinGame);
  const { avatarImages } = useSelector((state: RootState) => state.player);
  const [requestAnswer, setRequestAnswer] = useState<boolean | undefined>(undefined);
  const [hostName, setHostName] = useState<string | undefined>(undefined);
  const [declinedReason, setDeclinedReason] = useState<string | undefined>(undefined);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe(`game-${gameSlug}`);

    const playerId = isLogged ? id : guestPlayer.id;

    channel.bind(
      `answer-join-request-player${playerId}`,
      (data: { answerToRequest: boolean; hostName: string; declinedReason: string }) => {
        const { answerToRequest: isRequestAccepted, hostName, declinedReason } = data;
        setRequestAnswer(isRequestAccepted);
        setHostName(hostName);
        setDeclinedReason(declinedReason);
      }
    );

    return () => {
      pusher.unsubscribe(`answer-join-request-player${playerId}`);
    };
  });

  const updateGameSlug = (value: string, name: string) => {
    dispatch(updateJoinGameSlug(value, name));
  };

  const updateField = (value: string, name: string) => {
    dispatch(updateGuestPlayerInfos(value, name));
  };

  const handleSubmit = () => {
    dispatch(joinGameRequest());
  };

  const handleUpdatePlayerAvatar = async (avatarId: string) => {
    const newAvatar = await avatarImages.find((image: AvatarImage) => image.id === avatarId);
    dispatch(updateGuestPlayerInfos(newAvatar, 'avatar'));
  };

  const hasReceivedAnswer = requestAnswer !== undefined;
  const answerStatus = requestAnswer ? 'success' : 'error';

  const getAnswerMessage = () => {
    if (declinedReason) return t(declinedReason);
    if (requestAnswer) return t('joinGame:requestAccepted', { hostName });
    if (!requestAnswer) return t('joinGame:requestDeclined', { hostName });
  };

  return (
    <PageLayout title={t('joinGame:title')}>
      {hasReceivedAnswer && <AlertMessage status={answerStatus}>{getAnswerMessage()}</AlertMessage>}
      <Form onSubmit={handleSubmit}>
        <Text>{t('joinGame:description')}</Text>
        {!isLogged && (
          <>
            <Link href="/sign-in" asButton>
              {t('common:signIn')}
            </Link>
            <Stack direction="row" align="center">
              <AvatarSelector
                currentAvatar={guestPlayer.avatar.url}
                updatePlayerAvatar={handleUpdatePlayerAvatar}
              />
              <FormControl
                id="name"
                name="name"
                label={t('common:usernameLabel')}
                helperText={t('common:usernameHelperText')}
                value={guestPlayer.name}
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
          updateField={updateGameSlug}
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
    ...(await serverSideTranslations(locale, ['joinGame', 'newGame', 'common'])),
  },
});
