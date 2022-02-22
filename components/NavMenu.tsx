import { Box, List, ListItem, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from './Link';
import React from 'react';

interface NavMenuProps {
  onClick?: () => void;
  direction: 'column' | 'row';
}

const NavMenu: React.FC<NavMenuProps> = ({ onClick, direction }) => {
  const { t } = useTranslation('common');
  const navLinks = [
    {
      label: 'home',
      url: '/',
    },
    {
      label: 'signIn',
      url: '/sign-in',
    },
    {
      label: 'newGameAsGuest',
      url: '/new-game',
    },
    {
      label: 'joinGame',
      url: '/join-game',
    },
  ];

  return (
    <Box p={2} as="nav" data-cy="navMenu">
      <Stack as={List} direction={direction} spacing={{ base: 2, md: 5 }}>
        {navLinks.map((link) => (
          <ListItem key={link.label} onClick={onClick}>
            <Link href={link.url}>{t(link.label)}</Link>
          </ListItem>
        ))}
      </Stack>
    </Box>
  );
};

export default NavMenu;
