#!/bin/bash

cp /var/www/ecomap/etc/_ecomap.apache.conf /etc/apache2/sites-available/ecomap.conf

sed -i -e "s|rw.host=xxxxx|rw.host=$(cat /root/app_data/RDSInstance_Endpoint.Address)|g" /var/www/ecomap/etc/db.conf
sed -i -e "s|ro.host=xxxxx|ro.host=$(cat /root/app_data/RDSInstance_Endpoint.Address)|g" /var/www/ecomap/etc/db.conf

sed -i -e "s|ServerName xxxxx|ServerName $(cat /root/app_data/EC2InstanceElasticIp)|g" /etc/apache2/sites-available/ecomap.conf
sed -i -e "s|ServerAlias xxxxx|ServerAlias www.$(cat /root/app_data/EC2InstanceElasticIp)|g" /etc/apache2/sites-available/ecomap.conf
