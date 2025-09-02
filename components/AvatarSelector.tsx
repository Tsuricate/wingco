import { Avatar, Float, IconButton, Image, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { CiEdit } from 'react-icons/ci';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarImage } from '../models/players';
import { getAvatarImages } from '../redux/actions/player';
import { RootState } from '../redux/reducers';
import Dialog from './Dialog';
import { SafeAvatarImage } from './ui/chakraFixes';

interface AvatarSelectorProps {
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  currentAvatar: string;
  updatePlayerAvatar: (newAvatar: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  avatarSize,
  currentAvatar,
  updatePlayerAvatar,
}) => {
  const { open, onOpen, onClose } = useDisclosure();
  const { avatarImages } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();
  const { t } = useTranslation(['newGame', 'common']);
  const [newAvatar, setNewAvatar] = useState('');

  const handleClick = () => {
    onOpen();
    dispatch(getAvatarImages());
  };

  const handleChosenAvatar = () => {
    updatePlayerAvatar(newAvatar);
    onClose();
  };

  return (
    <>
      <Avatar.Root size={avatarSize} onClick={handleClick}>
        <SafeAvatarImage src={currentAvatar} />
        <Float placement="bottom-end" offsetX="1" offsetY="1">
          <IconButton aria-label="Modify avatar icon" rounded="full" size="2xs">
            <CiEdit />
          </IconButton>
        </Float>
      </Avatar.Root>
      <Dialog
        handleClose={onClose}
        open={open}
        title={t('newGame:chooseAvatar')}
        description={t('newGame:chooseAvatarDescription')}
        firstActionButton={t('common:save')}
        handleFirstAction={handleChosenAvatar}
      >
        <SimpleGrid columns={{ base: 3 }} gap={2}>
          {avatarImages.map((image: AvatarImage) => (
            <Image
              key={image.id}
              boxSize="96px"
              src={image.url}
              alt={image.url}
              objectFit="cover"
              border={newAvatar === image.id ? '4px solid #7AA8B9' : undefined}
              onClick={() => setNewAvatar(image.id)}
            />
          ))}
        </SimpleGrid>
      </Dialog>
    </>
  );
};

export default AvatarSelector;
