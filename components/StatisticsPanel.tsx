import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

interface StatisticsPanelProps {
  title: string;
  description: string;
}
const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ title, description, children }) => {
  return (
    <Box>
      <Heading fontSize="lg">{title}</Heading>
      <Text>{description}</Text>
      {children}
    </Box>
  );
};

export default StatisticsPanel;

// ChakraProps<ComponentWithAs<"svg", IconProps>
