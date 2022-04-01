import { CircularProgress } from '@chakra-ui/react';
import React from 'react';

const Loader: React.FC = () => {
  return <CircularProgress isIndeterminate color="green.300" />;
};

export default Loader;
