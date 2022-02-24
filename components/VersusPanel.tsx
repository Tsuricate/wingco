import { Avatar, Box, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Player from '../models/players';
import { GiPartyPopper } from 'react-icons/gi';

export interface VersusPanelProps {
  title: string;
  hasBestScore: boolean;
  bestScore: number;
  player: Player;
}

const VersusPanel: React.FC<VersusPanelProps> = ({ title, hasBestScore, bestScore, player }) => {
  const { t } = useTranslation('statistics');
  return (
    <Box mt={2}>
      <Heading fontSize="md">{title}</Heading>
      {hasBestScore ? (
        <Stack direction="row" align="center">
          <Icon as={GiPartyPopper} boxSize={5} />
          <Text>{t('detainedBestScore', { score: bestScore })}</Text>
        </Stack>
      ) : (
        <Stack direction="row" align="center">
          <Avatar name={player.name} size="sm" />
          <Text>
            {player.name} : {bestScore} {t('points')}
          </Text>
        </Stack>
      )}
    </Box>
  );
};

export default VersusPanel;
