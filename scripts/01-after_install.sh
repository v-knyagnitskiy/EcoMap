#!/bin/bash

sed -i -e "s|rw.host=xxxxx|rw.host=$(cat /root/app_data/RDSInstance_Endpoint.Address)|g" /var/www/ecomap/etc/db.conf
sed -i -e "s|ro.host=xxxxx|ro.host=$(cat /root/app_data/RDSInstance_Endpoint.Address)|g" /var/www/ecomap/etc/db.conf
