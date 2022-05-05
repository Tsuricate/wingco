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
import { EditIcon } from '@chakra-ui/icons';
import { avatarImages } from '../mockData/avatarImages';
import Modal from './Modal';

interface AvatarSelectorProps {
  avatarSize?: ThemingProps<'Avatar'>['size'];
  avatar?: string;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ avatarSize, avatar }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation(['newGame', 'common']);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chosenAvatar, setChosenAvatar] = useState('');

  const handleClick = () => {
    onOpen();
  };

  const handleChosenAvatar = (avatar: string) => {
    setChosenAvatar(avatar);
  };

  return (
    <>
      <Avatar size={avatarSize} src={avatar} onClick={handleClick}>
        <AvatarBadge boxSize="0.8em" borderWidth={2} borderColor="blackAlpha.500" bg="white">
          <Icon as={EditIcon} w="3" />
        </AvatarBadge>
      </Avatar>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        title={t('newGame:chooseAvatar')}
        description={t('newGame:chooseAvatarDescription')}
        closeMessage={t('common:cancel')}
        saveMessage={t('common:save')}
      >
        <SimpleGrid columns={{ base: 2 }} spacing={10}>
          {avatarImages.map((image) => (
            <Image
              key={image.src}
              boxSize="100px"
              src={image.src}
              alt={image.alt}
              objectFit="cover"
              onClick={() => handleChosenAvatar(image.src)}
            />
          ))}
        </SimpleGrid>
      </Modal>
    </>
  );
};

export default AvatarSelector;
