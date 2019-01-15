// Typescript version. 
import * as AWS from 'aws-sdk';

let cognitoProvider = new AWS.CognitoIdentityServiceProvider();

export const createUser = async (event, context, cb) => {
  try {
    console.log('Lambda initiated with event: ', event);
    let body = JSON.parse(event.body);

    const params = {
      ClientId: process.env.UserPoolClientId,
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

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'You have succesfully added a user',
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
};



// Javascript version
// var AWS = require('aws-sdk');

// let cognitoProvider = new AWS.CognitoIdentityServiceProvider();

// module.exports.createUser = async (event, context) => {
//   console.log('Lambda initiated with event: ', event); 
//   let body = JSON.parse(event.body);  

//   const params = {
//     ClientId: process.env.UserPoolClientId,
//     Password: body.password,
//     Username: body.userName,
//     UserAttributes: [
//       {
//         Name: 'email',
//         Value: body.email
//       }, 
//       {
//         Name: 'phone_number',
//         Value: body.phoneNumber
//       },
//       {
//         Name: 'name',
//         Value: body.name
//       }
//     ]
//   };

//   const res = await cognitoProvider.signUp(params).promise();
//   console.log('Result: ', res);

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'You have succesfully added a user',
//       result: res
//     })
//   };
// };