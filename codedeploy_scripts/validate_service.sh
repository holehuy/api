#!/bin/bash -e
source "/tmp/env"
sleep 60
APP_PORT=13001
KEEP_RELEASES=1
netstat -tulpn | grep $APP_PORT
RETURN_CODE=$?