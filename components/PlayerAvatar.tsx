import { Avatar, AvatarRootProps, Circle, Float, Stack, StackProps, Text } from '@chakra-ui/react';
import React from 'react';
import { PLAYER_BADGE } from '../models/players';
import { getBadgeColor } from '../utils/badgeUtils';
import { SafeAvatarImage } from './ui/chakraFixes';

interface PlayerAvatar {
  playerName?: string;
  direction?: StackProps['direction'];
  badge?: PLAYER_BADGE;
  avatarSize?: AvatarRootProps['size'];
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
      <Avatar.Root size={avatarSize} onClick={onClick}>
        <SafeAvatarImage name={playerName} src={avatar}>
          {badge && (
            <Float placement="bottom-end" offsetX="1" offsetY="1">
              <Circle bg={badgeColor} size="1.25em" outline="0.2em solid" outlineColor="bg" />
            </Float>
          )}
        </SafeAvatarImage>
      </Avatar.Root>
      <Text>{playerName}</Text>
    </Stack>
  );
};

export default PlayerAvatar;
