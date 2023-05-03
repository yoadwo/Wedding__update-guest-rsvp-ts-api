import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

// 1. this must be used in addition with middy plugin
// 2. when running locally, use deploy with --param flag to overwrite
export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'update-guest-rsvp/{inviteCode}',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        cors: {
          origin: '${param:CORS_ORIGINS}'
        },
      },
    },
  ],
};
