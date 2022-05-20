require('log-timestamp');
const waitForUserInput = require('wait-for-user-input')
const axios = require('axios');
const config = require('./config.json');

async function main () {
    var result = await axios({
        method: 'post',
        url: config.login_url,
        headers: { 'content-type': 'application/json' },
        data: {"email": config.email, "password": config.password, "deviceID": "123dsdf", "geetestResponse": {"lotNumber": "", "captchaOutput": "", "passToken": "", "genTime": ""}}
      });

    let token = result.data.data.token;

    // console.log(token);
    console.log("logined");

    result = await axios({
        method: 'get',
        url: config.code_url,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    // console.log(result.data.data);
    console.log("get code");

    const auth_code = await waitForUserInput('pls input the auth code:');

    result = await axios({
        method: 'put',
        url: config.verify_url,
        headers: {
            'content-type': 'application/json',
            'X-EmailCode': auth_code,
            'Authorization': 'Bearer ' + token
        }
    });

    console.log("token:" + result.data.data.token);
}

main().catch(console.error).finally(() => process.exit());
