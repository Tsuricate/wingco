import { Heading, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import PageLayout from '../components/PageLayout';

const Home: NextPage = () => {
  return (
    <PageLayout title="WingCo">
      <Stack spacing={{ base: 10 }}>
        <Heading as="h1">Wingspan Companion</Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nostrum ipsam repudiandae
          numquam libero temporibus magni ut, nihil explicabo minus quis quo. Modi quod distinctio
          placeat ipsum consequatur dolorum maxime facere labore in vitae ipsam at itaque, dolor
          dolorem ex facilis sapiente. Dolore facilis doloremque magnam soluta fugit hic culpa.
        </Text>
        <Link href="/sign-in">Log in / Sign up</Link>
        <Link href="/new-game">New game as guest</Link>
        <Link href="/join-game">Join existing game</Link>
      </Stack>
    </PageLayout>
  );
};

export default Home;
