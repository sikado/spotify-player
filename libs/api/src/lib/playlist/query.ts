const query = /* GraphQL */ `
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
            name
          }
          album {
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

export default query;
