// import { HamburgerIcon } from '@chakra-ui/icons';
// import { Box, Flex, Heading, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { PLAYER_BADGE } from '../models/players';
// import { RootState } from '../redux/reducers';
// import ColorModeToggle from './ColorModeToggle';
// import NavMenu from './NavMenu';
// import PlayerAvatar from './PlayerAvatar';

// const NavBar: React.FC = () => {
//   const { isLogged, avatar } = useSelector((state: RootState) => state.auth);
//   const { isOpen, onClose, onToggle } = useDisclosure();

//   return (
//     <Box as="header" p={2}>
//       <Flex align="center" justify="space-between">
//         <Heading>WingCo</Heading>
//         <Stack direction="row" display={{ base: 'flex', md: 'none' }}>
//           <ColorModeToggle />
//           {isLogged ? (
//             <PlayerAvatar badge={PLAYER_BADGE.Logged} avatar={avatar.url} onClick={onToggle} />
//           ) : (
//             <IconButton
//               data-cy="burgerButton"
//               aria-label="Open menu"
//               icon={<HamburgerIcon />}
//               onClick={onToggle}
//             />
//           )}
//         </Stack>
//         <Box display={{ base: 'none', md: 'block' }}>
//           <NavMenu direction="row" />
//         </Box>
//       </Flex>
//       <Box display={{ base: isOpen ? 'flex' : 'none', md: 'none' }} justifyContent="flex-end">
//         <NavMenu onClick={onClose} direction="column" />
//       </Box>
//     </Box>
//   );
// };

// export default NavBar;

import React from 'react';

const NavBar = () => {
  return <div></div>;
};

export default NavBar;
