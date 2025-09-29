import React from 'react';
import { HStack, IconButton, NumberInput } from '@chakra-ui/react';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { updatePlayerScore } from '../redux/actions/gameScores';
import { SafeDecrementTrigger, SafeIncrementTrigger } from './ui/chakraFixes';

interface ScoreInputProps {
  playerId: string;
  name: string;
  score: number;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ playerId, name, score }) => {
  const dispatch = useDispatch();

  const handleChange = ({ value, valueAsNumber }: { value: string; valueAsNumber: number }) => {
    dispatch(updatePlayerScore(valueAsNumber, name, playerId));
  };

  return (
    <NumberInput.Root
      unstyled
      min={0}
      defaultValue="0"
      name={name}
      value={score}
      onValueChange={handleChange}
    >
      <HStack gap="2">
        <SafeDecrementTrigger asChild>
          <IconButton variant="outline" size="sm">
            <LuMinus />
          </IconButton>
        </SafeDecrementTrigger>
        <NumberInput.ValueText />
        <SafeIncrementTrigger asChild>
          <IconButton variant="outline" size="sm">
            <LuPlus />
          </IconButton>
        </SafeIncrementTrigger>
      </HStack>
    </NumberInput.Root>
  );
};

export default ScoreInput;
