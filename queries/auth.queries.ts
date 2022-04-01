import { gql } from '@apollo/client';

export const FIND_PLAYER_BY_ID = gql`
  query findPlayerById($id: ID!) {
    player(where: { id: $id }) {
      id
      name
      email
      avatar {
        url
      }
    }
  }
`;
