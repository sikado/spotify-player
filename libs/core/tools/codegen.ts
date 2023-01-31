import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../src/lib/graphql/schema.ts',
  documents: ['../src/lib/graphql/*.ts'],
  generates: {
    '../src/lib/generated-types.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
    '../src/lib/persisted-query-ids/client.json': {
      plugins: [
        {
          'graphql-codegen-persisted-query-ids': {
            algorithm: 'sha256',
            output: 'client',
          },
        },
      ],
    },
    '../src/lib/persisted-query-ids/server.json': {
      plugins: [
        {
          'graphql-codegen-persisted-query-ids': {
            algorithm: 'sha256',
            output: 'server',
          },
        },
      ],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
