import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  variants: {
    variant: {
      solid: {
        bg: 'primary',
        color: 'onPrimary',
        _hover: {
          bg: 'primaryHover',
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'blue.500',
        color: 'blue.500',
        padding: 'spacing.medium',
        _hover: {
          bg: 'blue.50',
        },
      },
      disabled: {
        bg: 'gray.200',
        color: 'gray.500',
        padding: 'spacing.medium',
        cursor: 'not-allowed',
        opacity: 0.6,
      },
      subtle: {},
      surface: {},
      ghost: {},
      plain: {},
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
});
