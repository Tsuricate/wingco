import { Stack } from '@chakra-ui/react';
import React from 'react';

interface FormProps {
  onSubmit: () => void;
}

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>{children}</Stack>
    </form>
  );
};

export default Form;
