import { Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import Modal from './Modal';

interface ModalProps {
  title: string;
  closeMessage: string;
  children: string;
}

const successModal: ModalProps = {
  title: 'signUp:successModal.title',
  closeMessage: 'common:gotIt',
  children: 'signUp:successModal.children',
};

const errorCreatingUserModal: ModalProps = {
  title: 'signUp:errorCreatingUserModal.title',
  closeMessage: 'common:gotIt',
  children: 'signUp:errorCreatingUserModal.children',
};

const errorSendingEmailModal: ModalProps = {
  title: 'signUp:errorSendingEmailModal.title',
  closeMessage: 'common:gotIt',
  children: 'signUp:errorSendingEmailModal.children',
};

const SignUpModal: React.FC = () => {
  const { t } = useTranslation(['signUp', 'common']);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showSignUpModal, errorWhileCreatingUser, errorWhileSendingEmail } = useSelector(
    (state: RootState) => state.signUp
  );

  const getModalToShow = () => {
    if (errorWhileCreatingUser) return errorCreatingUserModal;
    if (errorWhileSendingEmail) return errorSendingEmailModal;
    return successModal;
  };

  const modalToShow = getModalToShow();

  useEffect(() => {
    if (showSignUpModal) {
      onOpen();
    }
  }, [onOpen, showSignUpModal]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t(`${modalToShow.title}`)}
      closeMessage={t(`${modalToShow.closeMessage}`)}
    >
      <Text>{t(`${modalToShow.children}`)}</Text>
    </Modal>
  );
};

export default SignUpModal;
