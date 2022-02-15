import { List, ListItem, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

interface NavMenuProps {
  onClick: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ onClick }) => {
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
    <Stack as="nav" data-cy="navMenu">
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.label} onClick={onClick}>
            <Link href={link.url}>{t(link.label)}</Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default NavMenu;
