import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import React from 'react';

type ButtonProps = {
  type?: ChakraButtonProps['type'];
  dataCy?: string;
  variant?: ChakraButtonProps['variant'];
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ type, dataCy, children, variant, onClick }) => {
  return (
    <ChakraButton
      data-cy={dataCy}
      type={type}
      variant={variant}
      onClick={onClick}
      colorScheme="blue"
    >
      {children}
    </ChakraButton>
  );
};

export default Button;