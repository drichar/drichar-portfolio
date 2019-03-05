import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const { name, description, image, url } = JSON.parse(event.body);

  const params = {
    TableName: 'projects',
    Item: {
      projectid: uuid.v1(),
      name,
      description,
      image,
      url,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (err) {
    return failure({ status: false });
  }
}
