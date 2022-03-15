import { ListItem, Stack, Text, UnorderedList, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Button from './Button';
import Modal from './Modal';

const InvitePlayerButton: React.FC = () => {
  const { t } = useTranslation(['newGame', 'common']);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInvitePlayer = () => {
    onOpen();
  };

  return (
    <>
      <Button variant="outline" onClick={handleInvitePlayer}>
        {t('newGame:invitePlayer')}
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        title={t('newGame:howInvitePlayer')}
        description={t('newGame:howInviteDescription', { gameId: '#156D5E8' })}
        closeMessage={t('common:gotIt')}
      >
        <Stack>
          <Text>{t('newGame:howInviteIntro')}</Text>
          <UnorderedList>
            <ListItem>{t('newGame:howInviteStep1')}</ListItem>
            <ListItem>{t('newGame:howInviteStep2')}</ListItem>
            <ListItem>{t('newGame:howInviteStep3')}</ListItem>
            <ListItem>{t('newGame:howInviteStep4', { gameId: '#156D5E8' })}</ListItem>
          </UnorderedList>
        </Stack>
      </Modal>
    </>
  );
};

export default InvitePlayerButton;
