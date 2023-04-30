import { mode } from '@chakra-ui/theme-tools';

const variantPageTitle = (props) => ({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  letterSpacing: { base: '4px', lg: '4px' },
  fontSize: '3xl',
  zIndex: '0',
  position: 'relative',
  _before: {
    content: '""',
    position: 'absolute',
    zIndex: '-1',
    bottom: { base: '52%', lg: '55%' },
    width: '110%',
    height: '20%',
    transform: { base: 'skew(-20deg) translateX(-8%)', xl: 'skew(-20deg) translateX(-10%)' },
    background: mode(
      'linear-gradient(90deg, rgba(233, 191, 93, 0.3), rgba(233, 191, 93, 0.6))',
      'linear-gradient(90deg, rgba(59, 126, 158, 0.3), rgba(59, 126, 158, 0.6))'
    )(props),
  },
});

const variants = {
  pageTitle: variantPageTitle,
};

export default { variants };
