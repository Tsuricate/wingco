import { Heading, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { IGamePlayer } from '../models/players';
import TwoColumnsLayout from './layout/TwoColumnsLayout';
import PlayerAvatar from './PlayerAvatar';
import ScoreInput from './ScoreInput';

interface ScoresSectionProps {
  category: string;
  players: Array<IGamePlayer>;
}

const ScoresSection: React.FC<ScoresSectionProps> = ({ category, players }) => {
  const { t } = useTranslation(['common']);

  return (
    <Stack>
      <Heading as="h3" fontSize="2xl">
        {t(`common:categories.${category}`)}
      </Heading>
      {players.map((player) => {
        return (
          <TwoColumnsLayout key={player.id}>
            <PlayerAvatar playerName={player.name} avatar={player.avatar?.url} />
            <ScoreInput playerId={player.id} name={category} score={player.scores[category]} />
          </TwoColumnsLayout>
        );
      })}
    </Stack>
  );
};

export default ScoresSection;
