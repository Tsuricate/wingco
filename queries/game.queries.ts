import { gql } from '@apollo/client';

export const CREATE_GAME_WITH_PLAYERS = gql`
  mutation CreateGameWithPlayers(
    $players: PlayerCreateManyInlineInput!
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
          players: $players
        }
        update: {}
      }
    ) {
      slug
      id
      players {
        id
        name
        avatar {
          id
          url
        }
        isRegistered
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
  mutation SaveResults(
    $gameId: ID!
    $gameScores: [GameScoreCreateInput!]
    $gameResults: [GameResultCreateInput!]
  ) {
    upsertGame(
      upsert: {
        update: { scores: { create: $gameScores }, results: { create: $gameResults } }
        create: {}
      }
      where: { id: $gameId }
    ) {
      id
    }
  }
`;

export const GET_GAME_RESULTS = gql`
  query GetGameResults($gameId: ID!) {
    game(where: { id: $gameId }) {
      players {
        id
        name
        avatar {
          url
          id
        }
      }
      results(orderBy: rank_ASC) {
        player {
          id
        }
        badge
        totalScore
      }
      scores {
        player {
          id
        }
        category {
          name
        }
        value
      }
    }
  }
`;

export const GET_ALL_GAME_IDS = gql`
  query GetAllGameIds {
    games {
      id
    }
  }
`;
