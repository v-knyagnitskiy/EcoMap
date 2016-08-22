#!/bin/bash

state_apache=`pgrep apache2`
state_app=`ls /etc/apache2/sites-enabled | grep ecomap.conf`

if [[ -n  $state_apache ]]
  then
    service apache2 stop
fi

if [[ -n  $state_app ]]
  then
    a2dissite ecomap
fi
