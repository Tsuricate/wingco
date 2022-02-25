import { Avatar, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Modal from './Modal';

const AvatarSelector: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation(['newGame', 'common']);
  const handleClick = () => {
    onOpen();
  };
  return (
    <>
      <Avatar size="md" onClick={handleClick} />
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        title={t('chooseAvatar')}
        description={t('chooseAvatarDescription')}
        closeMessage={t('cancel', { ns: 'common' })}
        saveMessage={t('save', { ns: 'common' })}
      ></Modal>
    </>
  );
};

export default AvatarSelector;
