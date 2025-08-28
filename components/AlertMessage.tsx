import { Alert } from '@chakra-ui/react';
import React from 'react';

interface AlertMessageProps {
  status: 'info' | 'warning' | 'success' | 'error' | 'neutral';
  title?: React.ReactNode;
  description: React.ReactNode;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ status, title, description }) => {
  return (
    <Alert.Root status={status} my={5}>
      <Alert.Indicator />
      <Alert.Content>
        {title && <Alert.Title>{title}</Alert.Title>}
        <Alert.Description>{description}</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
};

export default AlertMessage;
