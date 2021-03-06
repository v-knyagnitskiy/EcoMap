#!/bin/bash

cd /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive/ecomap/db/ecomap/

mysql \
--user=root \
--password=lv188kvtrootmysql \
--host=$(cat /root/app_data/RDSInstance_Endpoint.Address) \
--port=3306 \
--force \
--execute="DROP DATABASE IF EXISTS ecomap;" \
--execute="CREATE DATABASE ecomap;" \
--execute="DROP USER IF EXISTS 'dog'@'%';" \
--execute="DROP USER IF EXISTS 'cat'@'%';" \
--execute="CREATE USER 'dog'@'%' IDENTIFIED BY 'lv188kvtdogmysql';" \
--execute="CREATE USER 'cat'@'%' IDENTIFIED BY 'lv188kvtcatmysql';" \
--execute="GRANT ALL PRIVILEGES ON ecomap.* TO 'dog'@'%';" \
--execute="GRANT SELECT ON ecomap.* TO 'cat'@'%';" \
--execute="USE ecomap; SOURCE CREATE_DB.sql;" \
--execute="USE ecomap; SOURCE INSERT_DATA.sql;" \
--execute="FLUSH PRIVILEGES;"
