import * as AWS from 'aws-sdk';

let cognitoProvider = new AWS.CognitoIdentityServiceProvider();

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.createUser = async (event, context) => {
  console.log('Lambda initiated with event: ', event);  
  // UserPoolId: 'eu-west-1_V7lF6O5uV',

  const params: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
    ClientId: 'oet4c5tgg05m58muvc440tpib',
    Password: 'password',
    Username: 'johan.byren@enfogroup.com',
    UserAttributes: [
      {
        Name: 'email',
        Value: 'johan.byren@enfogroup.com'
      }
    ]
  };

  const res = await cognitoProvider.signUp(params).promise();

  return {
    statusCode: 200,
    response: res,
    input: event
  }
}