export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'drichar-images'
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://l0ays84dz9.execute-api.us-east-1.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_2xCn7nhbX',
    APP_CLIENT_ID: '3vubp9ss8nqsub57v93eeru8ph',
    IDENTITY_POOL_ID: 'us-east-1:bb3c85c3-aa50-47ef-9568-9a34fa963dfa'
  }
};
