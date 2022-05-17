import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { InewGamePlayer } from '../models/players';
import AvatarSelector from './AvatarSelector';
import FormControl from './FormControl';
import PlayerAvatar from './PlayerAvatar';

interface NewGamePlayerProps extends InewGamePlayer {
  playerNumber: number;
  onDeletePlayer: () => void;
  updateField: (name: string, value: string) => void;
}

const NewGamePlayer: React.FC<NewGamePlayerProps> = ({
  id,
  name,
  avatar,
  isRegistered,
  playerNumber,
  onDeletePlayer,
  updateField,
}) => {
  const { t } = useTranslation('newGame');

  return (
    <FormControl
      id={id}
      name={`player${playerNumber}`}
      value={name}
      label={t('newGame:player', { number: playerNumber })}
      updateField={updateField}
      leftSlot={
        isRegistered ? (
          <PlayerAvatar avatar={avatar} avatarSize="md" />
        ) : (
          <AvatarSelector currentAvatar={avatar} />
        )
      }
      rightSlot={
        playerNumber > 1 ? (
          <IconButton
            aria-label="Remove player from game"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={onDeletePlayer}
          />
        ) : undefined
      }
    />
  );
};

export default NewGamePlayer;
