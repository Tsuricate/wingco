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
import Link from './Link';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description?: string;
  firstActionButton?: string;
  secondActionButton?: string;
  handleFirstAction?: () => void;
  handleSecondAction?: () => void;
  href?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  title,
  description,
  children,
  firstActionButton,
  secondActionButton,
  handleFirstAction,
  handleSecondAction,
  href,
}) => {
  return (
    <>
      <ChakraModal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <Text textAlign="center">{description}</Text>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter justifyContent="center">
            <Stack>
              {firstActionButton && <Button onClick={handleFirstAction}>{firstActionButton}</Button>}
              {!href && secondActionButton && (
                <Button onClick={handleSecondAction}>{secondActionButton}</Button>
              )}
              {href && (
                <Link href={href} isExternal>
                  {secondActionButton}
                </Link>
              )}
              )
            </Stack>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default Modal;
