import { extendTheme } from '@chakra-ui/react';
import fonts from './fonts';
import components from './components';

const overrides = {
  fonts,
  components,
};

export default extendTheme(overrides);
