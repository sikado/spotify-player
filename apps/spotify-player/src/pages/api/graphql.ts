import { GRAPHQL_FILES } from '@spotify-player/core';
import { SpotifyApiWrapper } from '@spotify-player/server-api';
import { readFileSync } from 'fs';
import { createSchema, createYoga } from 'graphql-yoga';
import { join } from 'path';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga({
  schema: createSchema({
    typeDefs: readFileSync(join(GRAPHQL_FILES, 'schema.graphql'), 'utf-8'),
    resolvers: {
      Query: {
        playlist: () => SpotifyApiWrapper.getPlaylist('1cjaC8QSUT1ZoR9KG1TrXC'),
      },
    },
  }),
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  // plugins: [useDisableIntrospection()]
});
