import { Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { Player } from '../models/players';
import TwoColumnsLayout from './layout/TwoColumnsLayout';
import PlayerAvatar from './PlayerAvatar';
import ScoreInput from './ScoreInput';

interface ScoresSectionProps {
  title: string;
  players: Array<Player>;
}

const ScoresSection: React.FC<ScoresSectionProps> = ({ title, players }) => {
  return (
    <Stack>
      <Heading as="h3" fontSize="2xl">
        {title}
      </Heading>
      {players.map((player) => (
        <TwoColumnsLayout key={player.id}>
          <PlayerAvatar playerName={player.name} />
          {player.score === undefined ? <ScoreInput /> : player.score}
        </TwoColumnsLayout>
      ))}
    </Stack>
  );
};

export default ScoresSection;
