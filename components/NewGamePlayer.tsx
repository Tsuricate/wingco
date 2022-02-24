import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import AvatarSelector from './AvatarSelector';
import FormControl from './FormControl';

const NewGamePlayer: React.FC = () => {
  const { t } = useTranslation('newGame');
  return (
    <FormControl
      id="player"
      name="player"
      label={t('player')}
      leftSlot={<AvatarSelector />}
      rightSlot={
        <IconButton aria-label="Remove player from game" colorScheme="red" icon={<DeleteIcon />} />
      }
    />
  );
};

export default NewGamePlayer;
