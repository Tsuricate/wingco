import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        blue: {
          50: { value: '#ebf8ff' },
          500: { value: '#A74482' },
          700: { value: '#2b6cb0' },
        },
        gray: {
          300: { value: '#e2e8f0' },
          600: { value: '#4a5568' },
        },
        white: { value: '#ffffff' },
        green: {
          300: { value: '#68D391' },
          400: { value: '#48BB78' },
        },
        purple: {
          500: { value: '#805AD5' },
          600: { value: '#6B46C1' },
        },
      },
      spacing: {
        small: { value: '4px' },
        medium: { value: '8px' },
        large: { value: '16px' },
      },
      fonts: {
        body: { value: 'Inter, sans-serif' },
      },
      fontSizes: {
        sm: { value: '12px' },
      },
      fontWeights: {
        bold: { value: '700' },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          value: {
            base: '{colors.purple.500}',
            _dark: '{colors.green.300}',
          },
        },
        primaryHover: {
          value: {
            base: '{colors.purple.600}',
            _dark: '{colors.green.400}',
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
