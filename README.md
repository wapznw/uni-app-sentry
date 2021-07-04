# my-uni-project
打包
```
yarn
yarn global add miniprogram-ci

export WX_APPID=wxc00abdc91f****** #修改为自己的微信小程序id
export WX_APPID_KEY=private.wxc00abdc91f******.key #修改为自己的上传key文件路径
export RELEASE_VERSION=1.0.0
export WX_ROBOT=2 # 微信小程序上传机器人

cat > .sentryclirc <<EOF
[defaults]
url=https://sentry.io/
org=sentry
project=uni-app

[auth]
token=19fb0c89929b4a88ac00dcb4a9************** #修改为自己的Sentry auth token

EOF

node build.js
```
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
