import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, Stack } from '@chakra-ui/react';
import React from 'react';

const ScoreInput = () => {
  return (
    <Stack direction="row" align="center">
      <IconButton aria-label="Decrease score" icon={<MinusIcon />} size="sm" />
      <Input size="sm" type="number" min="0" />
      <IconButton aria-label="Increase score" icon={<AddIcon />} size="sm" />
    </Stack>
  );
};

export default ScoreInput;
