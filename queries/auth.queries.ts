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

export const DELETE_PLAYER_BY_ID = gql`
  mutation deletePlayerById($id: ID!) {
    deletePlayer(where: { id: $id }) {
      id
    }
  }
`;

export const CHANGE_PLAYER_EMAIL = gql`
  mutation ChangePlayerEmail($id: ID!, $email: String!) {
    updatePlayer(data: { email: $email }, where: { id: $id }) {
      id
    }
  }
`;

export const CHANGE_PLAYER_USERNAME = gql`
  mutation ChangePlayerUsername($id: ID!, $name: String!) {
    updatePlayer(data: { name: $name }, where: { id: $id }) {
      id
    }
  }
`;
