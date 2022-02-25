import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import AvatarSelector from './AvatarSelector';
import FormControl from './FormControl';

interface NewGamePlayerProps {
  playerNumber: number;
  onDeletePlayer: () => void;
}

const NewGamePlayer: React.FC<NewGamePlayerProps> = ({ playerNumber, onDeletePlayer }) => {
  const { t } = useTranslation('newGame');

  return (
    <FormControl
      id={`player${playerNumber}`}
      name={`player${playerNumber}`}
      label={t('player', { number: playerNumber })}
      leftSlot={<AvatarSelector />}
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
