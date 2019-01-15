import * as AWS from 'aws-sdk';

let cognitoProvider = new AWS.CognitoIdentityServiceProvider();

export const confirmUser = async (event, context, cb) => {
  try{
    console.log('Lambda initiated with event: ', event);
    let body = JSON.parse(event.body);

    const params = {
      ClientId: process.env.UserPoolClientId,
      Username: body.userName,
      ConfirmationCode: body.confirmationCode
    }

    await cognitoProvider.confirmSignUp(params).promise();
    
    const response = {
      statusCode: '200',
      body: JSON.stringify({
        message: 'User ' + body.userName + ' is now CONFIRMED'
      })
    }
    return cb(null, response);

  } catch(err) {
    const response = {
      statusCode: err.statusCode,
      body: JSON.stringify({
        message: 'An error occurred: ' + err.message
      })
    }
    return cb(null, response);
  }
}