import { Icon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
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
      <Flex alignItems="center">
        <Icon as={icon} boxSize={8} />
        <Stack spacing={0} m={2}>
          <Heading fontSize="lg">{title}</Heading>
          <Text>{description}</Text>
        </Stack>
      </Flex>
      {children}
    </Box>
  );
};

export default StatisticsPanel;
