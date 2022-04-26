import { Alert, AlertIcon, AlertProps } from '@chakra-ui/react';
import React from 'react';

interface AlertMessageProps {
  status: AlertProps['status'];
}

const AlertMessage: React.FC<AlertMessageProps> = ({ status, children }) => {
  return (
    <Alert status={status} my={5} flexDirection="column" alignItems="center" textAlign="center">
      <AlertIcon />
      {children}
    </Alert>
  );
};

export default AlertMessage;
