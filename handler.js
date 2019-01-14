'use strict';

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;

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

  //Define aws cognito user pool
  let poolData = {
    UserPoolId: 'eu-west-1_V7lF6O5uV',
    ClientId: 'oet4c5tgg05m58muvc440tpib'
  };
  
  let userPool = new CognitoUserPool(poolData);
  console.log('userPool:',userPool);
  
  //Defien User Attributes
  let attributeList = [];
  let dataEmail = {
    Name: 'johanbyren',
    Value: 'johan.byren@gmail.com'
  };

  let attributeEmail = new CognitoUserAttribute(dataEmail);
  attributeList.push(attributeEmail);

  //Create user via AWS Cognito
  userPool.signUp('username', 'password', attributeList, null, function(err, result){
    try {
      if(err) {
        console.log('err: ', err);
        callback(err, null);
      } else {
        console.log('result: ', result);
        let cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        callback(null, result);
      }
    } catch (err) {
      callback('Catch callback: ' + err, null);
    }
  })
}