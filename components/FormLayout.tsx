import { Stack } from '@chakra-ui/react';
import React from 'react';

const FormLayout: React.FC = ({ children }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>{children}</Stack>
    </form>
  );
};

export default FormLayout;
