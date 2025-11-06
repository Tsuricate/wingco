import { chakra, ButtonProps as ChakraButtonProps, Spinner } from '@chakra-ui/react';
import React from 'react';
import { buttonRecipe } from './ui/recipes/button.recipe';

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
  const RecipeButton = chakra('button', buttonRecipe);
  return (
    <RecipeButton
      data-cy={dataCy}
      type={type}
      variant={variant}
      disabled={isDisabled}
      loading={isLoading}
      loadingText={loadingText}
      onClick={onClick}
      {...buttonDefaultStyle}
    >
      {isLoading ? <Spinner size="sm" color="white" /> : children}
    </RecipeButton>
  );
};

export default Button;
