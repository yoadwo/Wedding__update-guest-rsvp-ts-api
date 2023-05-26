import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatOkResponse, formatBadRequestResponse, formatInternalErrorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { makeDb } from '@libs/promisify-mysql';

import schema from './schema';

const updateGuestRsvp: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  
  if (event.body.inviteCode != event.pathParameters?.inviteCode) {
    return formatBadRequestResponse({ message: 'Bad request', event })
  }

  const db = makeDb(); 

  try {
    const DbOkResponse = await db.query(
      `UPDATE ${process.env.GUESTS_DB_TABLE} SET attendingCount = ?, status = ?, lastUpdated = ? where phoneNumberHash = ?`,
      [event.body.attending, event.body.status, currentTimeToMysqlFormat(), event.body.inviteCode]);    
    if (DbOkResponse.affectedRows == 0){
      console.warn(`weirdly, no such guests with code ${event.body.inviteCode} exists`)
      return formatBadRequestResponse({data: {message: "No such guest", code: -1}});    
    } else {
      console.log(`guest ${event.body.inviteCode} updated with status ${event.body.status}`)
      return formatOkResponse({data: {message: "Guest updated", code: 0}});
    }    
  } catch (err) {
    console.error(err);
    return formatInternalErrorResponse({ message: err, event });
  } finally {
    await db.close();
  }
};

function currentTimeToMysqlFormat() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

export const main = middyfy(updateGuestRsvp);
