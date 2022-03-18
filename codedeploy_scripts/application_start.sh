#!/bin/bash -e
cat <<EOF | tee /home/app/${APPLICATION_NAME}/ecosystem.config.js
module.exports = {
  apps: [{
    "args": "start -p 13001",
    "cwd": "/home/app/rses-api-qa/current",
    "env": {
        "NODE_PORT": "0.0.0.0:13001"
    },
    "error_file": "~/.pm2/logs/${APPLICATION_NAME}-error.log",
    "exec_mode": "cluster",
    "instances": "max",
    "kill_timeout": 10000,
    "log_data_format": "YYYY-MM-DD HH:mm",
    "max_memory_restart": "1553M",
    "merge_logs": true,
    "name": "${APPLICATION_NAME}",
    "out_file": "~/.pm2/logs/${APPLICATION_NAME}-out.log",
    "script": "./src/index.js",
    "time": true
  }]
}
EOF

cd /home/app/${APPLICATION_NAME}/
pm2 start ecosystem.config.js
