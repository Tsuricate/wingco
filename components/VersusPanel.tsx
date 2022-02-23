import { SunIcon } from '@chakra-ui/icons';
import { Avatar, Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Player from '../models/players';

export interface VersusPanelProps {
  title: string;
  hasBestScore: boolean;
  bestScore: number;
  player: Player;
}

const VersusPanel: React.FC<VersusPanelProps> = ({ title, hasBestScore, bestScore, player }) => {
  const { t } = useTranslation('statistics');
  return (
    <Box>
      <Heading fontSize="md">{title}</Heading>

      {hasBestScore ? (
        <Stack direction="row">
          <SunIcon />
          <Text>{t('detainedBestScore', { score: bestScore })}</Text>
        </Stack>
      ) : (
        <Stack direction="row">
          <Avatar name={player.name} />
          <Text>
            {player.name} : {bestScore} {t('points')}
          </Text>
        </Stack>
      )}
    </Box>
  );
};

export default VersusPanel;
