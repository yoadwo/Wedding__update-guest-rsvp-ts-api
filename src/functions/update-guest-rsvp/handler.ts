import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatOkResponse, formatBadRequestResponse, formatInternalErrorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { makeDb } from '@libs/promisify-mysql';

import schema from './schema';

const updateGuestRsvp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const code = event.pathParameters?.inviteCode;

  if (event.body.inviteCode != code) {
    return formatBadRequestResponse({ message: 'Bad request', event })
  }

  const db = makeDb(); 

  try {
    const DbOkResponse = await db.query(
      "UPDATE guests SET attendingNumber = ? where phoneNumberHash = ?",
      [event.body.attending, event.body.inviteCode]);    
    if (DbOkResponse.affectedRows == 0){
      return formatBadRequestResponse({data: {message: "No such guest", code: -1}});    
    } else {
      return formatOkResponse({data: {message: "Guest updated", code: 0}});
    }    
  } catch (err) {
    console.error(err);
    return formatInternalErrorResponse({ message: err, event });
  } finally {
    await db.close();
  }
};

export const main = middyfy(updateGuestRsvp);
