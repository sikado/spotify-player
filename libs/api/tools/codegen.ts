import { CodegenConfig } from '@graphql-codegen/cli';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PUBLIC_API_URI } from '../../core/src';

const config: CodegenConfig = {
  schema: PUBLIC_API_URI,
  documents: ['../src/lib/**/*.ts'],
  generates: {
    '../src/lib/utils/generated-types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        typesPrefix: 'gql_',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
