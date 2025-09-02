import { gql } from '@apollo/client';

export const GET_AVATAR_IMAGES = gql`
  query getAvatarImages {
    assets {
      id
      url(transformation: { image: { resize: { height: 96, width: 96, fit: crop } } })
    }
  }
`;

export const CHANGE_PLAYER_AVATAR = gql`
  mutation UpdateAndPublishPlayerAvatar($playerId: ID!, $avatarId: ID!) {
    updatePlayer(data: { avatar: { connect: { id: $avatarId } } }, where: { id: $playerId }) {
      id
      avatar {
        id
        url
      }
    }
    publishPlayer(where: { id: $playerId }, to: PUBLISHED) {
      id
      avatar {
        id
        url
      }
    }
  }
`;

export const GET_PLAYER_STATISTICS = gql`
  query GetPlayerStatistics($playerId: ID!) {
    player(where: { id: $playerId }) {
      resultsAtGames {
        rank
      }
      gameScores {
        category {
          name
        }
        value
      }
      games {
        scores(where: { player: { id_not: $playerId } }) {
          category {
            name
          }
          value
          player {
            id
            name
            avatar {
              id
              url
            }
          }
        }
      }
    }
  }
`;
