import { List, ListItem, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

const NavMenu: React.FC = () => {
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
    <Stack as="nav" data-cy="navMenu" bg="goldenrod">
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.label}>
            <Link href={link.url}>{t(link.label)}</Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default NavMenu;
