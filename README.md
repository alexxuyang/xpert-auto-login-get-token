运行`npm install`

修改`config.json`中的email和password。

运行`node main.js`

期待的运行结果：

```
[2022-05-20T07:02:24.412Z] logined
[2022-05-20T07:02:27.732Z] get code
pls input the auth code:208223
[2022-05-20T07:02:40.960Z] token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjQ4NywiVFRMIjo0MzIwLCJUeXBlIjoiQVVUSF9DT0RFX1ZFUklGSUVEIiwiQ2xpZW50VHlwZSI6Ik1PQklMRSIsImV4cCI6MTgxMDcxMDE2MX0.EoczQOzEbtSraW1IcFGuyWW5zKLC1WTMy7zwqrqZh0Y
```

支持手机或邮件方式：

```
node main.js -m phone
node main.js -m email
```

支持dev或qa环境：

```
node main.js -e dev -m phone
node main.js -e qa -m email
```