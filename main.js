require('log-timestamp');
const waitForUserInput = require('wait-for-user-input')
const axios = require('axios');

async function main () {
    var result = await axios({
        method: 'post',
        url: 'https://develop-saas.nbltrust.com/saas-bg/api/v1/session',
        headers: { 'content-type': 'application/json' },
        data: {"email": "test.008@jadewallet.io", "password": "Test1234", "deviceID": "123dsdf", "geetestResponse": {"lotNumber": "", "captchaOutput": "", "passToken": "", "genTime": ""}}
      });

    let token = result.data.data.token;

    // console.log(token);
    console.log(1);

    result = await axios({
        method: 'get',
        url: 'https://develop-saas.nbltrust.com/saas-bg/api/v1/emailcode?action=login',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    // console.log(result.data.data);
    console.log(2);

    const auth_code = await waitForUserInput('pls input the auth code:');

    console.log(3);

    result = await axios({
        method: 'put',
        url: 'https://develop-saas.nbltrust.com/saas-bg/api/v1/account/verify-authcode',
        headers: {
            'content-type': 'application/json',
            'X-EmailCode': auth_code,
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(result.data.data.token);
}

main().catch(console.error).finally(() => process.exit());
