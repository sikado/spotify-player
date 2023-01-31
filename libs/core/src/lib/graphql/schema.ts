// eslint-disable-next-line import/prefer-default-export
export const schema = /* GraphQL */ `
  type Album {
    id: String!
    images: [Image]
    name: String
  }

  type Artist {
    id: String!
    name: String!
  }

  type Image {
    url: String!
    height: Int
    width: Int
  }

  type Playlist {
    id: String!
    images: [Image]
    name: String
    tracks: [PlaylistTrack!]
  }

  type PlaylistTrack {
    track: Track!
    added_at: String!
  }

  type Track {
    id: String!
    name: String!
    album: Album
    artists: [Artist]
    duration_ms: Float
    href: String
    popularity: Int
    preview_url: String
  }

  type Query {
    playlist: Playlist
  }
`;
