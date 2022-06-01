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
  mutation UpdatePlayerAvatar($playerId: ID!, $avatarId: ID!) {
    updatePlayer(data: { avatar: { connect: { id: $avatarId } } }, where: { id: $playerId }) {
      avatar {
        id
        url
      }
    }
  }
`;
