import { gql } from '@apollo/client';

export const SET_PASSWORD_RESET_CODE = gql`
  mutation setPasswordResetCode($email: String!, $passwordResetCode: String!) {
    updatePlayer(data: { passwordResetCode: $passwordResetCode }, where: { email: $email }) {
      name
      passwordResetCode
    }
  }
`;
