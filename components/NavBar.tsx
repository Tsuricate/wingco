import React from 'react';
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { PLAYER_BADGE } from '../models/players';
import { RootState } from '../redux/reducers';
import ColorModeToggle from './ColorModeToggle';
import PlayerAvatar from './PlayerAvatar';
import Link from './Link';
import LanguageSwitch from './LanguageSwitch';

const NavBar: React.FC = () => {
  const { isLogged, avatar } = useSelector((state: RootState) => state.auth);

  return (
    <Box as="header" p={2}>
      <Flex align="center" justifyContent="space-between">
        <Heading>WingCo</Heading>

        <Stack direction="row" display="flex">
          <LanguageSwitch />
          <ColorModeToggle />
          {isLogged && (
            <Link href="/account">
              <PlayerAvatar badge={PLAYER_BADGE.Logged} avatar={avatar.url} />
            </Link>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default NavBar;
