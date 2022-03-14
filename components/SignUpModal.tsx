import { Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import Modal from './Modal';

interface ModalProps {
  title: string;
  description: string;
  closeMessage: string;
  children: string;
}

const successModal: ModalProps = {
  title: 'Success',
  description: 'Everything went right !',
  closeMessage: 'Sign up',
  children: 'Please check your emails and click on the confirmation link !',
};

const errorCreatingUserModal: ModalProps = {
  title: 'Error',
  description: 'Error',
  closeMessage: 'Try again',
  children: 'Sorry, something went wront while creating your account',
};

const errorSendingEmailModal: ModalProps = {
  title: 'Error',
  description: 'Error ',
  closeMessage: 'Try again',
  children: 'Sorry, something went wront while sending your confirmation email',
};

const SignUpModal: React.FC = () => {
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
      title={modalToShow.title}
      description={modalToShow.description}
      closeMessage={modalToShow.closeMessage}
    >
      <Text>{modalToShow.children}</Text>
    </Modal>
  );
};

export default SignUpModal;
