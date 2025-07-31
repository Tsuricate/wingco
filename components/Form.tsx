import { Stack } from '@chakra-ui/react';
import React from 'react';

interface FormProps {
  onSubmit: () => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>{children}</Stack>
    </form>
  );
};

export default Form;
