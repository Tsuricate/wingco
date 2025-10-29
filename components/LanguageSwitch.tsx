import React from 'react';
import { SegmentGroup } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SafeSegmentGroupItem } from './ui/chakraFixes';

const languages = [
  { key: 'en', label: 'EN' },
  { key: 'fr', label: 'FR' },
];

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <SegmentGroup.Root value={i18n.language ?? 'en'}>
      <SegmentGroup.Indicator />
      {languages.map((language) => (
        <SafeSegmentGroupItem
          key={language.key}
          value={language.key}
          onClick={() => handleChange(language.key)}
        >
          {language.label}
        </SafeSegmentGroupItem>
      ))}
    </SegmentGroup.Root>
  );
};

export default LanguageToggle;
