import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ButtonProps, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

interface ColorModeToggleProps {
  rest?: ButtonProps[];
}

const ColorModeToggle: React.FC<ColorModeToggleProps> = ({ ...rest }) => {
  const { t } = useTranslation('common');
  const { toggleColorMode } = useColorMode();
  const ToggleIcon = useColorModeValue(MoonIcon, SunIcon);
  const targetColorMode = useColorModeValue(t('colorMode.dark'), t('colorMode.light'));

  const label = t('colorMode.toggleMode', { mode: targetColorMode });

  return (
    <IconButton
      aria-label={label}
      icon={<ToggleIcon />}
      onClick={toggleColorMode}
      title={label}
      {...rest}
    >
      Toggle theme
    </IconButton>
  );
};

export default ColorModeToggle;
