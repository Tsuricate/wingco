import {
  Button,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useBreakpointValue,
  useNumberInput,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePlayerScore } from '../redux/actions/gameScores';

interface ScoreInputProps {
  playerId: string;
  name: string;
  score: number;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ playerId, name, score }) => {
  const onSmallDevices = useBreakpointValue({ base: true, lg: false });
  const dispatch = useDispatch();

  const handleChange = (_valueAsString: string, valueAsNumber: number) => {
    dispatch(updatePlayerScore(valueAsNumber, name, playerId));
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: score,
    min: 0,
    name: name,
    value: score,
    onChange: handleChange,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return onSmallDevices ? (
    <HStack maxW="320px">
      <Button {...dec}>-</Button>
      <Input {...input} />
      <Button {...inc}>+</Button>
    </HStack>
  ) : (
    <NumberInput defaultValue={score} min={0} name={name} value={score} onChange={handleChange}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default ScoreInput;
