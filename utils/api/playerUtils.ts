import client from '../../apollo-client';
import { FIND_PLAYER } from '../../queries/signup.queries';

export const findPlayerByEmail = async (email: string) => {
  return await client.query({
    query: FIND_PLAYER,
    variables: { email },
  });
};
