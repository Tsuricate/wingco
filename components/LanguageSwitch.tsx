import { useRouter } from 'next/router';
import { SegmentGroup } from '@chakra-ui/react';
import { SafeSegmentGroupItem } from './ui/chakraFixes';
import { i18n } from 'next-i18next';

const languages = [
  { key: 'en', label: 'EN' },
  { key: 'fr', label: 'FR' },
];

const LanguageToggle = () => {
  const router = useRouter();
  const { asPath, locale } = router;

  const handleChange = async (lang: string) => {
    await i18n?.changeLanguage(lang);
    router.replace(asPath, asPath, { locale: lang, scroll: false });
  };
  return (
    <SegmentGroup.Root value={locale ?? 'fr'}>
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
