import { Stack, IconButton } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useColorMode } from './ui/color-mode';

const ColorModeToggle: React.FC = () => {
  const { t } = useTranslation('common');
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const targetColorMode = colorMode === 'light' ? t('colorMode.dark') : t('colorMode.light');
  const label = t('colorMode.toggleMode', { mode: targetColorMode });

  if (!mounted) return null;

  return (
    <Stack direction="row" alignItems="center">
      <IconButton aria-label={label} onClick={toggleColorMode} title={label}>
        {colorMode === 'light' ? <LuMoon /> : <LuSun />}
      </IconButton>
    </Stack>
  );
};

export default ColorModeToggle;
