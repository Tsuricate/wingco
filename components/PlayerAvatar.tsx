import { Avatar, AvatarBadge, Stack, StackDirection, Text } from '@chakra-ui/react';
import React from 'react';
import { PLAYER_BADGE } from '../models/players';
import { getBadgeColor } from '../utils/playersUtils';

interface PlayerAvatar {
  playerName: string;
  direction?: StackDirection;
  badge?: PLAYER_BADGE;
}

const PlayerAvatar: React.FC<PlayerAvatar> = ({ direction = 'row', playerName, badge }) => {
  const badgeColor = badge ? getBadgeColor(badge) : undefined;

  return (
    <Stack direction={direction} align="center">
      <Avatar name={playerName} size="sm">
        {badge && <AvatarBadge boxSize="1.25em" bg={badgeColor} />}
      </Avatar>
      <Text>{playerName}</Text>
    </Stack>
  );
};

export default PlayerAvatar;
