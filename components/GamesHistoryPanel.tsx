import { Avatar, AvatarBadge, Heading, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Link from './Link';

enum BADGE_COLORS {
  Gold = 'GOLD',
  Silver = 'SILVER',
  Bronze = 'BRONZE',
}

interface Player {
  id: number;
  name: string;
  badge: BADGE_COLORS | undefined;
}

export interface GamesHistoryPanelProps {
  id: number;
  date: string;
  players: Array<Player>;
}

const GamesHistoryPanel: React.FC<GamesHistoryPanelProps> = ({ id, date, players }) => {
  const { t } = useTranslation('common');

  return (
    <Stack>
      <Heading>{date}</Heading>
      {players.map((player: Player) => (
        <Avatar key={player.id} name={player.name}>
          {player.badge && <AvatarBadge boxSize="1.25em" bg={player.badge} />}
        </Avatar>
      ))}
      <Link href={`/game-result/${id}`} asButton>
        {t('viewDetail', { ns: 'common' })}
      </Link>
    </Stack>
  );
};

export default GamesHistoryPanel;
