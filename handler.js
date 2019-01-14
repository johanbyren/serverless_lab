'use strict';

var AWS = require('aws-sdk');

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

  let cognitoProvider = new AWS.CognitoIdentityServiceProvider();

  const params = {
    UserPoolId: 'eu-west-1_V7lF6O5uV',
    ClientId: 'oet4c5tgg05m58muvc440tpib',
    Password: 'password',
    Username: 'email',
    UserAttributes: [
      {
        Name: 'email',
        Value: 'email@email.com'
      }
    ]
  };


  return await cognitoProvider.signUp(params).promise();
}