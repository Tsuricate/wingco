import { gql } from '@apollo/client';

export const CREATE_PLAYER = gql`
  mutation CreatePlayer(
    $name: String!
    $email: String!
    $password: String!
    $isRegistered: Boolean!
    $hasVerifiedEmail: Boolean!
    $avatarId: ID!
  ) {
    createPlayer(
      data: {
        name: $name
        email: $email
        password: $password
        isRegistered: $isRegistered
        hasVerifiedEmail: $hasVerifiedEmail
        avatar: { connect: { id: $avatarId } }
      }
    ) {
      id
    }
  }
`;

export const FIND_PLAYER = gql`
  query FindPlayer($email: String!) {
    player(where: { email: $email }) {
      id
      name
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
