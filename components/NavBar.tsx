import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, IconButton, Stack } from '@chakra-ui/react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { PLAYER_BADGE } from '../models/players';
import { RootState } from '../redux/reducers';
import ColorModeToggle from './ColorModeToggle';
import PlayerAvatar from './PlayerAvatar';
import Link from './Link';
import LanguageSwitch from './LanguageSwitch';
import { useRouter } from 'next/router';

const NavBar: React.FC = () => {
  const { isLogged, avatar } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <Box as="header" p={2} display="flex" justifyContent="space-between">
      {!isHome && (
        <IconButton aria-label="Call support" variant="ghost" onClick={() => router.push('/')}>
          <IoMdArrowRoundBack />
        </IconButton>
      )}
      {isLogged && (
        <>
          <Link href="/account">
            <PlayerAvatar badge={PLAYER_BADGE.Logged} avatar={avatar.url} />
          </Link>
          <Heading>WingCo</Heading>
        </>
      )}

      <Stack direction="row" ml="auto">
        <LanguageSwitch />
        <ColorModeToggle />
      </Stack>
    </Box>
  );
};

export default NavBar;
