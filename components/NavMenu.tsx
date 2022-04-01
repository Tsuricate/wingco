import { Box, Divider, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { loggedNavLinks, publicNavLinks } from '../data/navMenu';
import { RootState } from '../redux/reducers';
import Link from './Link';

interface NavMenuProps {
  onClick?: () => void;
  direction: 'column' | 'row';
}

const NavMenu: React.FC<NavMenuProps> = ({ onClick, direction }) => {
  const { isLogged, name } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation('common');

  const navLinks = isLogged ? loggedNavLinks : publicNavLinks;

  return (
    <Box p={4} as="nav" data-cy="navMenu">
      <Stack align="flex-end" as={List} direction={direction} spacing={{ base: 2, md: 5 }}>
        {name && (
          <>
            <Text>{name}</Text> <Divider />
          </>
        )}
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
