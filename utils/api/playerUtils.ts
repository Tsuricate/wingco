import client from '../../apollo-client';
import { FIND_VERIFIED_PLAYER } from '../../queries/signin.queries';
import { FIND_PLAYER } from '../../queries/signup.queries';

export const findPlayerByEmail = async (email: string) => {
  return await client.query({
    query: FIND_PLAYER,
    variables: { email },
  });
};

export const findVerifiedPlayerByEmail = async (email: string) => {
  const response = await client.query({
    query: FIND_VERIFIED_PLAYER,
    variables: { email },
  });

  const [player] = response.data.players;

  if (player) {
    return player;
  } else {
    throw new Error();
  }
};
