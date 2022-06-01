import { gql } from '@apollo/client';

export const FIND_VERIFIED_PLAYER = gql`
  query findVerifiedPlayer($email: String!) {
    players(where: { email: $email, hasVerifiedEmail: true }) {
      id
      name
      email
      password
      avatar {
        id
        url
      }
    }
  }
`;
