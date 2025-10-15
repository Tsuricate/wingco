import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        blue: {
          50: { value: '#A3C7C2' },
          300: { value: '#6C9CA6' },
          500: { value: '#497D86' },
          900: { value: '#0E2A47' },
        },
        green: {
          50: { value: '#89B6A5' },
          500: { value: '#6D6F4A' },
          900: { value: '#233A28' },
        },
        yellow: {
          500: { value: '#DA9E35' },
          700: { value: '#C28A37' },
        },
        white: {
          50: { value: '#FFFFFF' },
          300: { value: '#FAF5D5' },
        },
        purple: {
          100: { value: '#C7B3D9' },
        },
        gray: {
          50: { value: '#EAE6D9' },
          300: { value: '#D1C9B8' },
          500: { value: '#B6B0A3' },
        },
        orange: {
          100: { value: '#E6A07C' },
          300: { value: '#C7471C' },
          800: { value: '#8C3F23' },
        },
        black: {
          500: { value: '#2A2A2A' },
        },
      },
      spacing: {
        small: { value: '4px' },
        medium: { value: '8px' },
        large: { value: '16px' },
      },
      fonts: {
        body: { value: 'Lato, sans-serif' },
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
        pageBg: {
          value: {
            base: '{colors.white.300}',
            _dark: '{colors.green.900}',
          },
        },
        solidButtonBg: {
          value: {
            base: '{colors.green.500}',
            _dark: '{colors.yellow.700}',
          },
        },
        solidButtonHover: {
          value: {
            base: '{colors.yellow.700}',
            _dark: '{colors.yellow.500}',
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
