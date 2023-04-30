import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import React from 'react';

type ButtonProps = {
  type?: ChakraButtonProps['type'];
  dataCy?: string;
  variant?: ChakraButtonProps['variant'];
  isDisabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
};

export const buttonDefaultStyle: ChakraButtonProps = {
  colorScheme: 'blue',
};

const Button: React.FC<ButtonProps> = ({
  type,
  dataCy,
  children,
  variant,
  isDisabled,
  onClick,
  isLoading,
  loadingText,
}) => {
  return (
    <ChakraButton
      data-cy={dataCy}
      type={type}
      variant={variant}
      isDisabled={isDisabled}
      isLoading={isLoading}
      loadingText={loadingText}
      onClick={onClick}
      {...buttonDefaultStyle}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
