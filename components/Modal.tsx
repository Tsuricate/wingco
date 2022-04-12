import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  saveMessage?: string;
  closeMessage: string;
  onClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  saveMessage,
  closeMessage,
  onClick,
}) => {
  return (
    <>
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <Text textAlign="center">{description}</Text>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter justifyContent="center">
            <Stack>
              {saveMessage && <Button onClick={onClose}>{saveMessage}</Button>}
              <Button onClick={onClick}>{closeMessage}</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default Modal;
