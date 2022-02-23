import { Icon } from '@chakra-ui/icons';
import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface StatisticsPanelProps {
  icon: IconType;
  title: string;
  description: string;
}
const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  title,
  description,
  icon,
  children,
}) => {
  return (
    <Box>
      <Icon as={icon} />
      <Heading fontSize="lg">{title}</Heading>
      <Text>{description}</Text>
      {children}
    </Box>
  );
};

export default StatisticsPanel;
