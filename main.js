require('log-timestamp');
const waitForUserInput = require('wait-for-user-input')
const axios = require('axios');
const config = require('./config.json');
const args = require('args');

async function main () {
    args.option('method', 'the verification method, email or phone', 'email')
    args.option('env', 'the env for which to connect, dev or qa', 'dev')
    const flags = args.parse(process.argv)
    
    if (flags.method) {
        console.log(`verification method: ${flags.method}`)
    }

    let env = flags.env;

    if (env) {
        console.log(`env to connect: ${env}`)
    }

    var result = await axios({
        method: 'post',
        url: config[env + '_url'] + config.login_url,
        headers: { 'content-type': 'application/json' },
        data: {"email": config.email, "password": config.password, "deviceID": "123dsdf", "geetestResponse": {"lotNumber": "", "captchaOutput": "", "passToken": "", "genTime": ""}}
      });

    let token = result.data.data.token;

    // console.log(token);
    console.log("logined");

    result = await axios({
        method: 'get',
        url: config[env + '_url'] + config.code_url[flags.method],
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
        url: config[env + '_url'] + config.verify_url,
        headers: {
            'content-type': 'application/json',
            'X-EmailCode': auth_code,
            'Authorization': 'Bearer ' + token
        }
    });

    console.log("token:" + result.data.data.token);
}

main().catch(console.error).finally(() => process.exit());
