#!/bin/bash

state_app=`ls /etc/apache2/sites-enabled | grep ecomap.conf`
 
if [[ -n  $state_app ]]
  then
    a2dissite ecomap
fi
