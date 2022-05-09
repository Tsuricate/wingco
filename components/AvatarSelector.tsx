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
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ avatarSize, currentAvatar }) => {
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
    console.log('avatar :', newAvatar);
    // dispatch(updatePlayerAvatar(avatar));
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
        <SimpleGrid columns={{ base: 3 }} spacing={10}>
          {avatarImages.map((image: AvatarImage) => (
            <Image
              key={image.url}
              boxSize="96px"
              src={image.url}
              alt={image.url}
              objectFit="cover"
              border={newAvatar === image.url ? '4px solid #7AA8B9' : undefined}
              onClick={() => setNewAvatar(image.url)}
            />
          ))}
        </SimpleGrid>
      </Modal>
    </>
  );
};

export default AvatarSelector;
