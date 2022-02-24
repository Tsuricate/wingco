import { Avatar } from '@chakra-ui/react';
import React from 'react';

const AvatarSelector: React.FC = () => {
  const handleClick = () => {
    console.log('Choose an avatar!');
  };
  return <Avatar size="sm" onClick={handleClick} />;
};

export default AvatarSelector;
