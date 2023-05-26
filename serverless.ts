import type { AWS } from '@serverless/typescript';

import updateGuestRsvp from '@functions/update-guest-rsvp';

const serverlessConfiguration: AWS = {
  org: 'yoadw',
  app: 'wedding-invitations-aws',
  service: 'update-guest-rsvp-ts-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: [ 
        "apiKey-updateGuestRsvp",        
      ]
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      GUESTS_DB_HOST: '${param:GUESTS_DB_HOST}',
      GUESTS_DB_USER: '${param:GUESTS_DB_USER}',
      GUESTS_DB_PWD: '${param:GUESTS_DB_PWD}',
      GUESTS_DB_NAME: '${param:GUESTS_DB_NAME}',
      GUESTS_DB_TABLE: '${param:GUESTS_DB_TABLE, "guests"}',
      CORS_ORIGINS: '${param:CORS_ORIGINS}' // override with --param for localhost
    },
  },
  // import the function via paths
  functions: { updateGuestRsvp },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
