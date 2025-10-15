import {
  Dialog as ChakraDialog,
  CloseButton,
  ConditionalValue,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Button from './Button';
import Link from './Link';
import { SafeDialogCloseTrigger, SafeDialogContent, SafeDialogPositioner } from './ui/chakraFixes';

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  placement?: ConditionalValue<'top' | 'center' | 'bottom' | undefined>;
  title: string;
  description?: string;
  firstActionButton?: string;
  secondActionButton?: string;
  handleFirstAction?: () => void;
  handleSecondAction?: () => void;
  href?: string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  handleClose,
  placement = 'top',
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
      <ChakraDialog.Root
        open={open}
        onClose={handleClose}
        onOpenChange={handleClose}
        placement={placement}
      >
        <Portal>
          <ChakraDialog.Backdrop />
          <SafeDialogPositioner>
            <SafeDialogContent>
              <ChakraDialog.Header>{title}</ChakraDialog.Header>
              <Text textAlign="center">{description}</Text>
              <ChakraDialog.Body>{children}</ChakraDialog.Body>
              <ChakraDialog.Footer justifyContent="center">
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
                </Stack>
              </ChakraDialog.Footer>
              <SafeDialogCloseTrigger asChild>
                <CloseButton size="sm" />
              </SafeDialogCloseTrigger>
            </SafeDialogContent>
          </SafeDialogPositioner>
        </Portal>
      </ChakraDialog.Root>
    </>
  );
};

export default Dialog;
