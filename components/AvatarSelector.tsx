import { Avatar, Image, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { avatarImages } from '../mockData/avatarImages';
import Modal from './Modal';

const AvatarSelector: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation(['newGame', 'common']);
  const [chosenAvatar, setChosenAvatar] = useState('');

  const handleClick = () => {
    onOpen();
  };

  const handleChosenAvatar = (avatar: string) => {
    setChosenAvatar(avatar);
  };

  return (
    <>
      <Avatar size="md" src={chosenAvatar} onClick={handleClick} />
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
