import { gql } from '@apollo/client';

export const CREATE_GAME_WITH_PLAYERS = gql`
  mutation CreateGameWithPlayers(
    $participants: [ParticipationCreateInput!]
    $gameSlug: String!
    $hostId: ID
    $withOceaniaExpansion: Boolean
  ) {
    upsertGame(
      where: { slug: $gameSlug }
      upsert: {
        create: {
          slug: $gameSlug
          withOceaniaExpansion: $withOceaniaExpansion
          hostedBy: { connect: { id: $hostId } }
          participants: { create: $participants }
        }
        update: {}
      }
    ) {
      slug
      id
      participants {
        player {
          name
          isRegistered
          hasVerifiedEmail
        }
      }
    }
  }
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(where: { id: $id }) {
      id
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      isComputed
      isFromOceaniaExpansion
    }
  }
`;

export const SAVE_RESULTS = gql`
  mutation SaveResults($gameId: ID!, $results: [ResultCreateInput!]) {
    upsertGame(
      upsert: { update: { results: { create: $results } }, create: {} }
      where: { id: $gameId }
    ) {
      id
    }
  }
`;
