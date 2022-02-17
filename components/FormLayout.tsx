import { Stack } from '@chakra-ui/react';
import React from 'react';

const FormLayout: React.FC = ({ children }) => {
  return (
    <form>
      <Stack spacing={5}>{children}</Stack>
    </form>
  );
};

export default FormLayout;
