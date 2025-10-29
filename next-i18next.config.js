module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['en', 'fr'],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
