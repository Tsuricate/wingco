import { Heading, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { GameHistoryResults } from '../models/game';
import Link from './Link';
import PlayerAvatar from './PlayerAvatar';

export interface GamesHistoryPanelProps {
  id: string;
  date: string;
  players: Array<GameHistoryResults>;
}

const GamesHistoryPanel: React.FC<GamesHistoryPanelProps> = ({ id, date, players }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const formattedDate = new Date(date).toLocaleDateString(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = new Date(date).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Stack>
      <Heading size="md">{`${formattedDate} ${formattedTime}`}</Heading>
      <Stack direction="row">
        {players.map((player) => {
          return (
            <PlayerAvatar
              key={player.player.id}
              badge={player.badge}
              avatar={player.player.avatar.url}
              avatarSize="md"
            />
          );
        })}
      </Stack>
      <Link href={`/game-results/${id}`} asButton>
        {t('common:viewDetail')}
      </Link>
    </Stack>
  );
};

export default GamesHistoryPanel;
