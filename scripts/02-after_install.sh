#!/bin/bash

cp /var/www/ecomap/etc/_ecomap.apache.conf /etc/apache2/sites-available/ecomap.conf

chmod 644 /etc/apache2/sites-available/ecomap.conf

sed -i -e "s|ServerName xxxxx|ServerName $(cat /root/app_data/EC2InstanceElasticIp)|g" /etc/apache2/sites-available/ecomap.conf
sed -i -e "s|ServerAlias xxxxx|ServerAlias www.$(cat /root/app_data/EC2InstanceElasticIp)|g" /etc/apache2/sites-available/ecomap.conf
