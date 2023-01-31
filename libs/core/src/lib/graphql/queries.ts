// eslint-disable-next-line import/prefer-default-export
export const queryGetPlaylist = /* GraphQL */ `
  query getPlaylist {
    playlist {
      id
      name
      images {
        url
      }
      tracks {
        added_at
        track {
          preview_url
          id
          name
          duration_ms
          artists {
            id
            name
          }
          album {
            id
            name
            images {
              url
            }
          }
        }
      }
    }
  }
`;
