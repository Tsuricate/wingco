import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { NewGamePlayer } from '../models/players';
import AvatarSelector from './AvatarSelector';
import FormControl from './FormControl';
import PlayerAvatar from './PlayerAvatar';

interface NewGamePlayerProps extends NewGamePlayer {
  playerNumber: number;
  onDeletePlayer: () => void;
}

const NewGamePlayer: React.FC<NewGamePlayerProps> = ({
  id,
  name,
  avatar,
  isRegistered,
  playerNumber,
  onDeletePlayer,
}) => {
  const { t } = useTranslation('newGame');

  const updateField = () => {
    console.log('Update');
  };

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
