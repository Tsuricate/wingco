import { BackgroundProps, Center, Heading, LinkBox } from '@chakra-ui/react';
import React from 'react';
import Link from './Link';

export interface AccountPanelProps {
  title: string;
  background?: BackgroundProps['background'];
  url: string;
}

const AccountPanel: React.FC<AccountPanelProps> = ({ title, background, url }) => {
  return (
    <LinkBox as={Center} bg={background} p={8} minH={{ base: 16, sm: 32 }}>
      <Heading fontSize="xl">
        <Link href={url} asOverlay>
          {title}
        </Link>
      </Heading>
    </LinkBox>
  );
};

export default AccountPanel;
