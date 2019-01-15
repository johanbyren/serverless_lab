var AWS = require('aws-sdk');

let cognitoProvider = new AWS.CognitoIdentityServiceProvider();

module.exports.createUser = async (event, context) => {
  console.log('Lambda initiated with event: ', event); 
  let body = JSON.parse(event.body);  

  const params = {
    ClientId: 'oet4c5tgg05m58muvc440tpib',
    Password: body.password,
    Username: body.userName,
    UserAttributes: [
      {
        Name: 'email',
        Value: body.email
      }, 
      {
        Name: 'phone_number',
        Value: body.phoneNumber
      },
      {
        Name: 'name',
        Value: body.name
      }
    ]
  };

  const res = await cognitoProvider.signUp(params).promise();
  console.log('Result: ', res);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'You have succesfully added a user',
      result: res
    })
  };
};