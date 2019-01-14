let poolData = {
  UserPoolId: 'eu-west-1_V7lF6O5uV',
  ClientId: 'oet4c5tgg05m58muvc440tpib'
};

let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
let userData = {
  UserName: 'johanbyren',
  Pool: userPool
}