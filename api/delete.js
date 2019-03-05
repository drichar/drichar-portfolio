import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: 'projects',
    Key: {
      projectid: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call('delete', params);
    return success({ status: true });
  } catch (err) {
    return failure({ status: false });
  }
}
