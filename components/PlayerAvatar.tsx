import { Avatar, AvatarBadge, Stack, StackDirection, Text, ThemingProps } from '@chakra-ui/react';
import React from 'react';
import { PLAYER_BADGE } from '../models/players';
import { getBadgeColor } from '../utils/badgeUtils';

interface PlayerAvatar {
  playerName?: string;
  direction?: StackDirection;
  badge?: PLAYER_BADGE;
  avatarSize?: ThemingProps<'Avatar'>['size'];
  avatar?: string;
  onClick?: () => void;
}

const PlayerAvatar: React.FC<PlayerAvatar> = ({
  direction = 'row',
  playerName,
  badge,
  avatarSize = 'sm',
  avatar = undefined,
  onClick,
}) => {
  const badgeColor = badge ? getBadgeColor(badge) : undefined;

  return (
    <Stack direction={direction} align="center">
      <Avatar
        name={playerName}
        size={avatarSize}
        src={avatar}
        onClick={onClick}
        cursor={onClick ? 'pointer' : 'none'}
      >
        {badge && <AvatarBadge boxSize="1.25em" bg={badgeColor} />}
      </Avatar>
      <Text>{playerName}</Text>
    </Stack>
  );
};

export default PlayerAvatar;
