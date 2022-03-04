import { gql } from '@apollo/client';

export const CREATE_PLAYER = gql`
  mutation CreatePlayer(
    $name: String!
    $email: String!
    $password: String!
    $isRegistered: Boolean!
  ) {
    createPlayer(
      data: { name: $name, email: $email, password: $password, isRegistered: $isRegistered }
    ) {
      id
    }
  }
`;
