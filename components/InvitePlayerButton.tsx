import { ListItem, Stack, Text, UnorderedList, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import Button from './Button';
import Modal from './Modal';

const InvitePlayerButton: React.FC = () => {
  const { t } = useTranslation(['newGame', 'common']);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { gameSlug } = useSelector((state: RootState) => state.game);

  const handleInvitePlayer = () => {
    onOpen();
  };

  return (
    <>
      <Button variant="outline" onClick={handleInvitePlayer}>
        {t('newGame:invitePlayer')}
      </Button>
      <Modal
        handleClose={onClose}
        isOpen={isOpen}
        title={t('newGame:howInvitePlayer')}
        description={t('newGame:howInviteDescription', { gameId: gameSlug })}
        secondActionButton={t('common:gotIt')}
        handleSecondAction={onClose}
      >
        <Stack>
          <Text>{t('newGame:howInviteIntro')}</Text>
          <UnorderedList>
            <ListItem>{t('newGame:howInviteStep1')}</ListItem>
            <ListItem>{t('newGame:howInviteStep2')}</ListItem>
            <ListItem>{t('newGame:howInviteStep3')}</ListItem>
            <ListItem>{t('newGame:howInviteStep4')}</ListItem>
          </UnorderedList>
        </Stack>
      </Modal>
    </>
  );
};

export default InvitePlayerButton;
