import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import uniqid from 'uniqid';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Switch, Text, useDisclosure } from '@chakra-ui/react';
import Button from '../components/Button';
import InvitePlayerButton from '../components/InvitePlayerButton';
import PageLayout from '../components/layout/PageLayout';
import Dialog from '../components/Dialog';
import NewGamePlayer from '../components/NewGamePlayer';
import { SafeSwitchLabel } from '../components/ui/chakraFixes';
import { defaultPlayer, defaultScores } from '../constants/game';
import { IGamePlayer, Player, PlayerWithRegisteredInfos } from '../models/players';
import { addPlayerInQueue, answerJoinRequest, deletePlayerInQueue } from '../redux/actions/joinGame';
import {
  addPlayer,
  createNewGame,
  initializeGamePlayers,
  removePlayer,
  updateGame,
  updateGameWithNectar,
  updatePlayerInfos,
} from '../redux/actions/newGame';
import { RootState } from '../redux/reducers';
import { getEstimatedTime } from '../utils/newGame';
import { GameWithPlayers } from '../models/game';
import { FormError, validateFormData } from '../utils/formUtils';
import { gamePlayersListSchema } from '../validations';

interface NewGameProps {
  isEditing: boolean;
  urlGameSlug?: string;
  game?: GameWithPlayers;
}

const NewGame: React.FC<NewGameProps> = ({ isEditing = false, urlGameSlug, game }) => {
  const { t } = useTranslation(['common', 'newGame', 'validations']);
  const dispatch = useDispatch();
  const router = useRouter();
  const { open, onOpen, onClose } = useDisclosure();
  const [initialPlayers, setInitialPlayers] = useState<PlayerWithRegisteredInfos[]>([]);
  const [formErrors, setFormErrors] = useState<FormError[]>([]);
  const { gameSlug, players, gameWithNectar } = useSelector((state: RootState) => state.game);
  const { playersInQueue } = useSelector((state: RootState) => state.joinGame);
  const hasReachedMaxPlayers = players.length === 5;
  const estimatedTime = getEstimatedTime(players.length * 35);

  const activeSlug = isEditing && urlGameSlug ? urlGameSlug : gameSlug;
  const gameButtonLabel = isEditing ? t('newGame:saveAndContinue') : t('newGame:startGame');

  useEffect(() => {
    setInitialPlayers(players);
  }, []);

  useEffect(() => {
    if (game?.players && players.length === 0) {
      dispatch(initializeGamePlayers(game.players));
      setInitialPlayers(game.players);
    }
  }, [game, players]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
      cluster: 'eu',
    });
    const channel = pusher.subscribe(`game-${activeSlug}`);
    channel.bind('join-game-request', async (data: { player: Player }) => {
      dispatch(addPlayerInQueue(data.player));
    });
    return () => {
      pusher.unsubscribe('join-game-request');
    };
  }, [dispatch, activeSlug]);

  useEffect(() => {
    if (playersInQueue.length > 0) {
      const playerAlreadyInGame = players.some((player: Player) => player.id === playersInQueue[0].id);
      if (!playerAlreadyInGame && !hasReachedMaxPlayers) {
        onOpen();
      } else {
        onClose();
        dispatch(deletePlayerInQueue(playersInQueue[0].id));
        const declinedReason = playerAlreadyInGame
          ? 'joinGame:alreadyInGame'
          : 'joinGame:tooManyPlayers';
        dispatch(answerJoinRequest(playersInQueue[0].id, false, gameSlug, declinedReason));
      }
    }
  }, [hasReachedMaxPlayers, playersInQueue]);

  const handleSwitch = (event: { checked: boolean }) => {
    dispatch(updateGameWithNectar(event.checked));
  };

  const handleAddPlayer = (invitedPlayer: Player | undefined) => {
    if (!hasReachedMaxPlayers) {
      const player = invitedPlayer
        ? {
            ...invitedPlayer,
            isRegistered: true,
            scores: defaultScores,
          }
        : { ...defaultPlayer, id: uniqid() };
      dispatch(addPlayer(player));
    }
  };

  const handleUpdatePlayerInfos = (value: string, playerId: string) => {
    dispatch(updatePlayerInfos(value, playerId));
  };

  const handleDeletePlayer = (playerId: string) => {
    dispatch(removePlayer(playerId));
  };

  const handleSubmit = () => {
    validateFormData(gamePlayersListSchema, players)
      .then(async () => {
        setFormErrors([]);
        isEditing
          ? dispatch(updateGame(initialPlayers, players, activeSlug))
          : dispatch(createNewGame());
        router.push(`/game-scores/${activeSlug}`);
      })
      .catch((errorsArray) => {
        setFormErrors(errorsArray);
      });
  };

  const handleAnswerJoinRequest = (player: Player, isAccepted: boolean) => {
    dispatch(answerJoinRequest(player.id, isAccepted, gameSlug));
    onClose();
    if (isAccepted) handleAddPlayer(player);
    dispatch(deletePlayerInQueue(player.id));
  };

  return (
    <PageLayout title={t('newGame:title')}>
      <Text>ID {activeSlug}</Text>
      <Stack>
        {players.map((player: IGamePlayer, index: number) => {
          const playerErrors: string[] = formErrors
            .filter((err) => err.name === `[${index}].name`)
            .map((err) => err.message);
          return (
            <NewGamePlayer
              key={player.id}
              id={player.id}
              name={player.name}
              avatar={player.avatar}
              isRegistered={player.isRegistered}
              playerNumber={index + 1}
              onDeletePlayer={() => handleDeletePlayer(player.id)}
              updateField={(value: any) => handleUpdatePlayerInfos(value, player.id)}
              errors={playerErrors}
            />
          );
        })}
        <Button isDisabled={hasReachedMaxPlayers} onClick={() => handleAddPlayer(undefined)}>
          {t('newGame:addPlayer')}
        </Button>
        <InvitePlayerButton />
        <Switch.Root id="useNectar" checked={gameWithNectar} onCheckedChange={handleSwitch}>
          <Switch.HiddenInput />
          <Stack direction="row" align="center">
            <SafeSwitchLabel htmlFor="useNectar">{t('newGame:useNectar')}</SafeSwitchLabel>
            <Switch.Control />
          </Stack>
        </Switch.Root>
        <Text>{t('newGame:estimatedTime', { duration: estimatedTime })}</Text>
        <Button type="submit" onClick={handleSubmit}>
          {gameButtonLabel}
        </Button>
        <Button variant="outline" onClick={() => router.push('/')}>
          {t('common:home')}
        </Button>
      </Stack>
      {playersInQueue.length > 0 && (
        <Dialog
          key={playersInQueue[0].id}
          open={open}
          handleClose={() => onClose()}
          title={t('newGame:joiningGame', { player: playersInQueue[0].name })}
          firstActionButton={t('common:accept')}
          handleFirstAction={() => handleAnswerJoinRequest(playersInQueue[0], true)}
          secondActionButton={t('common:decline')}
          handleSecondAction={() => handleAnswerJoinRequest(playersInQueue[0], false)}
        >
          <></>
        </Dialog>
      )}
    </PageLayout>
  );
};

export default NewGame;
