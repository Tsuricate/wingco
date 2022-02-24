import { ListItem, Stack, Text, UnorderedList, useDisclosure } from '@chakra-ui/react';
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
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        title={t('howInvitePlayer')}
        description={t('howInviteDescription', { gameId: '#156D5E8' })}
        closeMessage={t('closeMessage')}
      >
        <Stack>
          <Text>{t('howInviteIntro')}</Text>
          <UnorderedList>
            <ListItem>{t('howInviteStep1')}</ListItem>
            <ListItem>{t('howInviteStep2')}</ListItem>
            <ListItem>{t('howInviteStep3')}</ListItem>
            <ListItem>{t('howInviteStep4', { gameId: '#156D5E8' })}</ListItem>
          </UnorderedList>
        </Stack>
      </Modal>
    </>
  );
};

export default InvitePlayerButton;
