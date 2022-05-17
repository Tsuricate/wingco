import { EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Icon,
  Image,
  SimpleGrid,
  ThemingProps,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarImage } from '../models/players';
import { getAvatarImages } from '../redux/actions/player';
import { RootState } from '../redux/reducers';
import Modal from './Modal';

interface AvatarSelectorProps {
  avatarSize?: ThemingProps<'Avatar'>['size'];
  currentAvatar?: string | undefined;
  updatePlayerAvatar: (newAvatar: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  avatarSize,
  currentAvatar,
  updatePlayerAvatar,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { avatarImages } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();
  const { t } = useTranslation(['newGame', 'common']);
  const [newAvatar, setNewAvatar] = useState('');

  const handleClick = () => {
    onOpen();
    dispatch(getAvatarImages());
  };

  const handleChosenAvatar = () => {
    dispatch(updatePlayerAvatar(newAvatar));
    onClose();
  };

  return (
    <>
      <Avatar size={avatarSize} src={currentAvatar} onClick={handleClick}>
        <AvatarBadge boxSize="0.8em" borderWidth={2} borderColor="blackAlpha.500" bg="white">
          <Icon as={EditIcon} w="3" />
        </AvatarBadge>
      </Avatar>
      <Modal
        handleClose={onClose}
        isOpen={isOpen}
        title={t('newGame:chooseAvatar')}
        description={t('newGame:chooseAvatarDescription')}
        firstActionButton={t('common:save')}
        handleFirstAction={handleChosenAvatar}
      >
        <SimpleGrid columns={{ base: 3 }} spacing={2}>
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
      </Modal>
    </>
  );
};

export default AvatarSelector;
