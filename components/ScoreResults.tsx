import { Accordion, Box, Heading, Span, Text } from '@chakra-ui/react';
import React from 'react';
import { ScoreByCategory } from '../models/game';
import TwoColumnsLayout from './layout/TwoColumnsLayout';
import PlayerAvatar from './PlayerAvatar';
import { SafeAccordionItem, SafeAccordionItemContent, SafeAccordionItemTrigger } from './ui/chakraFixes';

interface ScoreResultsProps {
  category: string;
  playersScore: ScoreByCategory['scores'];
}

const ScoreResults: React.FC<ScoreResultsProps> = ({ category, playersScore }) => {
  return (
    <Accordion.Root multiple>
      <SafeAccordionItem>
        <SafeAccordionItemTrigger>
          <Span flex="1">{category}</Span>
          <Accordion.ItemIndicator />
        </SafeAccordionItemTrigger>
        <SafeAccordionItemContent>
          <Accordion.ItemBody>
            {playersScore.map((player) => (
              <TwoColumnsLayout key={player.player.id}>
                <PlayerAvatar playerName={player.player.name} avatar={player.player.avatar?.url} />
                <Text>{player.score}</Text>
              </TwoColumnsLayout>
            ))}
          </Accordion.ItemBody>
        </SafeAccordionItemContent>
      </SafeAccordionItem>
    </Accordion.Root>
  );
};

export default ScoreResults;
