import { gql } from '@apollo/client';

export const GET_AVATAR_IMAGES = gql`
  query getAvatarImages {
    assets {
      url(transformation: { image: { resize: { height: 96, width: 96, fit: crop } } })
    }
  }
`;
