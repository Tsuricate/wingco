import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ScoreByCategory } from '../models/game';
import TwoColumnsLayout from './layout/TwoColumnsLayout';
import PlayerAvatar from './PlayerAvatar';

interface ScoreResultsProps {
  category: string;
  playersScore: ScoreByCategory['scores'];
}

const ScoreResults: React.FC<ScoreResultsProps> = ({ category, playersScore }) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading as="h3" fontSize="2xl">
                {category}
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {playersScore.map((player) => (
            <TwoColumnsLayout key={player.player.id}>
              <PlayerAvatar playerName={player.player.name} avatar={player.player.avatar?.url} />
              <Text>{player.score}</Text>
            </TwoColumnsLayout>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ScoreResults;
