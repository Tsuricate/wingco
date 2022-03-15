import { gql } from '@apollo/client';

export const CREATE_PLAYER = gql`
  mutation CreatePlayer(
    $name: String!
    $email: String!
    $password: String!
    $isRegistered: Boolean!
    $hasVerifiedEmail: Boolean!
  ) {
    createPlayer(
      data: {
        name: $name
        email: $email
        password: $password
        isRegistered: $isRegistered
        hasVerifiedEmail: $hasVerifiedEmail
      }
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

export const VERIFY_VALIDATION_EMAIL_TOKEN = gql`
  mutation VerifyEmailToken($validationEmailToken: String!) {
    updatePlayer(
      where: { validationEmailToken: $validationEmailToken }
      data: { hasVerifiedEmail: true }
    ) {
      id
    }
  }
`;
