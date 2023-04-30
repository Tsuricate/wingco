import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    test: {
      backgroundColor: 'teal',
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
});

export default Button;
