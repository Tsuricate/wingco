import { useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Button from './Button';
import Modal from './Modal';

const InvitePlayerButton: React.FC = () => {
  const { t } = useTranslation('newGame');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInvitePlayer = () => {
    onOpen();
  };

  return (
    <>
      <Button variant="outline" onClick={handleInvitePlayer}>
        {t('invitePlayer')}
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default InvitePlayerButton;
