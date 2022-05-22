import { gql } from '@apollo/client';

export const CREATE_GAME = gql`
  mutation createNewGame($slug: String!) {
    createGame(data: { slug: $slug }) {
      id
      slug
    }
  }
`;
