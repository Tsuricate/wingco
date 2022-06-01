import { Badge, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

interface NewRecordProps {
  newRecord: number;
  category: string;
  playerName: string;
  previousRecord: number;
}

const NewRecord: React.FC<NewRecordProps> = ({ newRecord, category, playerName, previousRecord }) => {
  const { t } = useTranslation('gameResults');
  return (
    <Stack direction="row" align="center" spacing={5}>
      <Badge variant="solid">{t('gameResults:newRecord')}</Badge>
      <Text>
        {t('gameResults:newRecordDescription', { newRecord, category, playerName, previousRecord })}
      </Text>
    </Stack>
  );
};

export default NewRecord;
