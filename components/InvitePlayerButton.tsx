import { List, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import Button from './Button';
import Dialog from './Dialog';

const InvitePlayerButton: React.FC = () => {
  const { t } = useTranslation(['newGame', 'common']);
  const { open, onOpen, onClose } = useDisclosure();
  const { gameSlug } = useSelector((state: RootState) => state.game);

  const handleInvitePlayer = () => {
    console.log('passing in HANDLE INVITE PLAYER', open);
    onOpen();
  };

  return (
    <>
      <Button variant="outline" onClick={handleInvitePlayer}>
        {t('newGame:invitePlayer')}
      </Button>
      <Dialog
        handleClose={onClose}
        open={open}
        title={t('newGame:howInvitePlayer')}
        description={t('newGame:howInviteDescription', { gameId: gameSlug })}
        secondActionButton={t('common:gotIt')}
        handleSecondAction={onClose}
      >
        <Stack>
          <Text>{t('newGame:howInviteIntro')}</Text>
          <List.Root>
            <List.Item>{t('newGame:howInviteStep1')}</List.Item>
            <List.Item>{t('newGame:howInviteStep2')}</List.Item>
            <List.Item>{t('newGame:howInviteStep3')}</List.Item>
            <List.Item>{t('newGame:howInviteStep4')}</List.Item>
          </List.Root>
        </Stack>
      </Dialog>
    </>
  );
};

export default InvitePlayerButton;
