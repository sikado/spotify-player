/* eslint-disable react-hooks/rules-of-hooks */
import { EnvelopArmorPlugin } from '@escape.tech/graphql-armor';
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { useResponseCache } from '@graphql-yoga/plugin-response-cache';
import { schema, serverPersistedQuery } from '@spotify-player/core';
import { SpotifyApiWrapper } from '@spotify-player/server-api';
import { createSchema, createYoga } from 'graphql-yoga';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let plugins: any[] = [
  useResponseCache({
    // global cache
    session: () => null,
  }),
  usePersistedOperations({
    getPersistedOperation(key: string) {
      return serverPersistedQuery[key as keyof typeof serverPersistedQuery];
    },
  }),
];
let graphiql = true;

if (process.env.NODE_ENV === 'production') {
  plugins = [
    ...plugins,
    useDisableIntrospection(),
    EnvelopArmorPlugin({
      blockFieldSuggestion: {
        enabled: true,
      },
    }),
  ];
  graphiql = false;
}

export default createYoga({
  schema: createSchema({
    typeDefs: schema,
    resolvers: {
      Query: {
        playlist: () => SpotifyApiWrapper.getPlaylist('1cjaC8QSUT1ZoR9KG1TrXC'),
      },
    },
  }),
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  plugins,
  graphiql,
});
