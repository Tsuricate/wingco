import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import Player from '../models/players';
import TwoColumnsLayout from './layout/TwoColumnsLayout';
import PlayerAvatar from './PlayerAvatar';
import ScoreInput from './ScoreInput';

interface ScoresSectionProps {
  scoreTitle: string;
  players: Array<Player>;
}

const ScoresSection: React.FC<ScoresSectionProps> = ({ scoreTitle, players }) => {
  return (
    <Box>
      <Heading>{scoreTitle}</Heading>
      {players.map((player) => (
        <TwoColumnsLayout key={player.id}>
          <PlayerAvatar playerName={player.name} />
          <ScoreInput />
        </TwoColumnsLayout>
      ))}
    </Box>
  );
};

export default ScoresSection;
