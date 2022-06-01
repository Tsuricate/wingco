import { Avatar, AvatarBadge, Heading, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { PlayerWithBadge } from '../models/players';
import { getBadgeColor } from '../utils/badgeUtils';
import Link from './Link';

export interface GamesHistoryPanelProps {
  id: number;
  date: string;
  players: Array<PlayerWithBadge>;
}

const GamesHistoryPanel: React.FC<GamesHistoryPanelProps> = ({ id, date, players }) => {
  const { t } = useTranslation('common');

  return (
    <Stack>
      <Heading>{date}</Heading>
      <Stack direction="row">
        {players.map((player: PlayerWithBadge) => {
          const badgeColor = player.badge ? getBadgeColor(player.badge) : undefined;
          return (
            <Avatar key={player.id} name={player.name}>
              {player.badge && <AvatarBadge boxSize="1.25em" bg={badgeColor} />}
            </Avatar>
          );
        })}
      </Stack>
      <Link href={`/game-result/${id}`} asButton>
        {t('common:viewDetail')}
      </Link>
    </Stack>
  );
};

export default GamesHistoryPanel;
