#!/bin/bash -e
sudo useradd -m -s /bin/bash app || echo ""
sudo chown -R app:app /home/app/${APPLICATION_NAME}
sudo rm -f /tmp/env
sudo rm -rf /home/app/.tmp
sudo su app -c "pm2 stop /home/app/${APPLICATION_NAME}/ecosystem.config.js" || echo ""
sudo rm -rf /home/app/${APPLICATION_NAME}/*