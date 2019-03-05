import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const { name, description, image, url } = JSON.parse(event.body);

  const params = {
    TableName: 'projects',
    Key: {
      projectid: event.pathParameters.id
    },
    ExpressionAttributeNames: {
      // 'name' and 'url' are reserved keywords
      // TODO: rename these
      '#name': 'name',
      '#url': 'url'
    },
    ExpressionAttributeValues: {
      ':name': name || null,
      ':description': description || null,
      ':image': image || null,
      ':url': url || null
    },
    UpdateExpression: 'SET #name = :name, description = :description, image = :image, #url = :url',
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (err) {
    console.log(err);
    return failure({ status: false });
  }
}
