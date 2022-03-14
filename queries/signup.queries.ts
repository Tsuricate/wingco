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

export const SET_VALIDATION_EMAIL_TOKEN = gql`
  mutation UpdatePlayer($id: ID, $validationEmailToken: String!) {
    updatePlayer(data: { validationEmailToken: $validationEmailToken }, where: { id: $id }) {
      id
      validationEmailToken
    }
  }
`;
