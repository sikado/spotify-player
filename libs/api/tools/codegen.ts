import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URI,
  documents: ['src/lib/*.graphql'],
  generates: {
    './generated-types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        typesPrefix: 'gql_'
      }
    },
  },
  ignoreNoDocuments: true,
};

export default config;