#!/bin/bash -e
#Environment Variables
if [[ "${APPLICATION_NAME}" == *stag* ]]; then
  ENV="stag"
elif [[ "${APPLICATION_NAME}" == *prod* ]]; then
  ENV="prod"
else
  ENV="qa"
fi

# if [[ "${APPLICATION_NAME}" == *dev* ]]; then
#   error_notifier="false"
# else
#   error_notifier="true"
# fi

DEPLOY_FOLDER=$(echo $(date +%Y%m%d-%H%M%S-%N))
echo "export DEPLOY_FOLDER=\"$DEPLOY_FOLDER\"" > "/tmp/env"
cd /home/app/${APPLICATION_NAME}

if [[ -f ecosystem.config.js ]]; then
  pm2 delete ecosystem.config.js
else
  echo "First deploy"
fi

mkdir -p /home/app/${APPLICATION_NAME}/releases/

cp -r /home/app/.tmp /home/app/${APPLICATION_NAME}/releases/$DEPLOY_FOLDER

ln -s /home/app/${APPLICATION_NAME}/releases/$DEPLOY_FOLDER /home/app/${APPLICATION_NAME}/current

#Get value from SSM
host=$(aws ssm get-parameters --name "/rses-api/${ENV}/host"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
username=$(aws ssm get-parameters --name "/rses-api/${ENV}/username"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
password=$(aws ssm get-parameters --name "/rses-api/${ENV}/password"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
database=$(aws ssm get-parameters --name "/rses-api/${ENV}/database"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
bucketName=$(aws ssm get-parameters --name "/rses-api/${ENV}/bucketName"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
dsn=$(aws ssm get-parameters --name "/rses-api/${ENV}/dsn"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
accessKeyId=$(aws ssm get-parameters --name "/rses-api/${ENV}/accessKeyId"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
secretAccessKey=$(aws ssm get-parameters --name "/rses-api/${ENV}/secretAccessKey"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
clientSecret=$(aws ssm get-parameters --name "/rses-api/${ENV}/clientSecret"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
clientId=$(aws ssm get-parameters --name "/rses-api/${ENV}/clientId"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
jwtSecretKey=$(aws ssm get-parameters --name "/rses-api/${ENV}/jwtSecretKey"  --with-decryption --region "ap-northeast-1" --query  "Parameters[0]".Value --output text)
botUserOAuthToken=$(aws ssm get-parameters --name "/rses-api/${ENV}/botUserOAuthToken" --with-decryption --region "ap-northeast-1" --query "Parameters[0]".Value --output text)
botUserOAuthTokenEST=$(aws ssm get-parameters --name "/rses-api/${ENV}/botUserOAuthTokenEST" --with-decryption --region "ap-northeast-1" --query "Parameters[0]".Value --output text)

#Create JSON
cat <<EOF | tee /home/app/${APPLICATION_NAME}/current/env.yaml
development:
  app:
    name: rs-es-api
    environment: local
    logLevel: debug
    host: 0.0.0.0
    port: 13001
    locale: en
    timezone: Asia/Ho_Chi_Minh
    authentication:
      jwtAcessTokenExpiredIn: 3600
      jwtRefreshTokenExpiredIn: 15778463
      corsWhiteURL: https://console.rses-qa.est-rouge-tech.com
      jwtSecretKey: ${jwtSecretKey}
      prefix: authentication
    authorization:
      prefix: authorization
      ttl: 3600
    whiteListEmailDomain: rising-stars.vn,tech.est-rouge.com

  databases:
    mysql:
      type: mysql
      host: ${host}
      port: 3306
      username: ${username}
      password: ${password}
      database: ${database}
      dialect: mysql

  storages:
    s3:
      bucketName: ${bucketName}
      basePath: base-path
      publicUrl:

  errorNotifier:
    enabled: false
    driver: sentry
    service: sentry

  services:
    sentry:
      type: sentry
      dsn:  ${dsn}
    aws:
      accessKeyId: ${accessKeyId}
      secretAccessKey: ${secretAccessKey}
      regionName: ap-northeast-1
    google:
      clientSecret: ${clientSecret}
      clientId: ${clientId}
      callbackURL: https://api.rses-qa.est-rouge-tech.com/v1/auth/google/callback
      successRedirect: https://console.rses-qa.est-rouge-tech.com/login/success
      failureRedirect: https://console.rses-qa.est-rouge-tech.com/login/failure
    slack:
      botUserOAuthTokenEST: ${botUserOAuthTokenEST}
      botUserOAuthTokenRS: ${botUserOAuthToken}
EOF

#NPM install
cd /home/app/${APPLICATION_NAME}/current
npm i
