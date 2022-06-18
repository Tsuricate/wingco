import { Box, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { GiPartyPopper, GiShrug } from 'react-icons/gi';
import { VersusResult } from '../models/statistics';
import PlayerAvatar from './PlayerAvatar';

const VersusPanel: React.FC<VersusResult> = ({ category, hasBestScore, bestScore, isDraw, players }) => {
  const { t } = useTranslation(['statistics', 'common']);
  const playersName = players?.map((player) => player.name);

  return (
    <Box mt={2}>
      <Heading fontSize="md">{t(`common:categories.${category}`)}</Heading>
      {hasBestScore && !isDraw && (
        <Stack direction="row" align="center">
          <Icon as={GiPartyPopper} boxSize={5} />
          <Text>{t('statistics:detainedBestScore', { score: bestScore })}</Text>
        </Stack>
      )}
      {!hasBestScore &&
        players?.map((player) => (
          <Stack direction="row" align="center" key={player.id}>
            <PlayerAvatar playerName={player.name} avatar={player.avatar.url} />
            <Text>
              {bestScore} {t('common:points')}
            </Text>
          </Stack>
        ))}
      {isDraw && (
        <Stack direction="row" align="center">
          <Icon as={GiShrug} boxSize={5} />
          <Text>{t('statistics:versusDraw', { players: playersName, bestScore })}</Text>
        </Stack>
      )}
    </Box>
  );
};

export default VersusPanel;
