import * as AWS from 'aws-sdk';

let cognitoProvider = new AWS.CognitoIdentityServiceProvider();

export const signInUser = async (event, context, cb) => {
  try {
    console.log('Lambda initiated with event: ', event);
    let body = JSON.parse(event.body);

    const params = {
      ClientId: process.env.UserPoolClientId,
      UserPoolId: process.env.UserPoolId,
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      AuthParameters: {
        USERNAME: body.userName,
        PASSWORD: body.password
      }
    };

    const res = await cognitoProvider.adminInitiateAuth(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'You have logged in',
        result: res
      })
    };

    return cb(null, response);

  } catch (err) {
    const response = {
      statusCode: err.statusCode,
      body: JSON.stringify({
        message: 'An error occurred: ' + err.message
      })
    }

    return cb(null, response);
  }
}