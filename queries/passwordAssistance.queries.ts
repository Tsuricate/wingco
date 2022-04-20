import { gql } from '@apollo/client';

export const SET_PASSWORD_RESET_CODE = gql`
  mutation setPasswordResetCode($email: String!, $passwordResetCode: String!) {
    updatePlayer(data: { passwordResetCode: $passwordResetCode }, where: { email: $email }) {
      name
      passwordResetCode
    }
  }
`;

export const VERIFY_PASSWORD_RESET_CODE = gql`
  query findPlayerByResetCode($passwordResetCode: String!) {
    player(where: { passwordResetCode: $passwordResetCode }) {
      id
    }
  }
`;

export const CHANGE_PLAYER_PASSWORD = gql`
  mutation ChangePlayerPassword($email: String!, $password: String!) {
    updatePlayer(data: { password: $password }, where: { email: $email }) {
      id
    }
  }
`;
