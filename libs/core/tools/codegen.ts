import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../src/lib/graphql/schema.graphql',
  documents: ['../src/lib/graphql/*.ts'],
  generates: {
    '../src/lib/generated-types.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
