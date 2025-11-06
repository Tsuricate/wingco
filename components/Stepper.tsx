import React from 'react';
import { Stack, Circle, Text, Box } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';

interface StepperProps {
  steps: { title: string }[];
  currentStep: number;
  completedSteps: boolean;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, completedSteps }) => {
  return (
    <Stack direction="column" width="100%" gap={4}>
      <Stack direction="row" align="center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <>
              <Circle
                size="32px"
                bg={isCompleted ? 'green.500' : isActive ? 'blue.500' : 'gray.300'}
                color="white"
              >
                {isCompleted || completedSteps ? <FaCheck /> : index + 1}
              </Circle>

              {index < steps.length - 1 && (
                <Box flex="1" height="2px" bg={index < currentStep ? 'green.500' : 'gray.300'} />
              )}
            </>
          );
        })}
      </Stack>

      <Stack direction="row" justify="space-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <Text key={index} color={isCompleted || isActive ? 'black' : 'gray.500'} fontSize="sm">
              {step.title}
            </Text>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Stepper;
