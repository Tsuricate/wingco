import { Container } from '@chakra-ui/react';
import React from 'react';

const PageLayout: React.FC = ({ children }) => <Container as="main">{children}</Container>;

export default PageLayout;
