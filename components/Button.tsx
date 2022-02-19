import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import React from 'react';

type ButtonProps = {
  type?: ChakraButtonProps['type'];
  name: string;
  variant?: ChakraButtonProps['variant'];
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ type, name, children, variant, onClick }) => {
  return (
    <ChakraButton type={type} name={name} variant={variant} onClick={onClick}>
      {children}
    </ChakraButton>
  );
};

export default Button;
