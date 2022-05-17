import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarImage, InewGamePlayer } from '../models/players';
import { updateNewPlayerAvatar } from '../redux/actions/player';
import { RootState } from '../redux/reducers';
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
  const dispatch = useDispatch();
  const { avatarImages } = useSelector((state: RootState) => state.player);

  const handleNewPlayerAvatar = async (avatarId: string) => {
    const newAvatarUrl = await avatarImages.find((image: AvatarImage) => image.id === avatarId);
    dispatch(updateNewPlayerAvatar(id, newAvatarUrl.url));
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
          <AvatarSelector currentAvatar={avatar} updatePlayerAvatar={handleNewPlayerAvatar} />
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
