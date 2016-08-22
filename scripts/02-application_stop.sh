#!/bin/bash

state_conf=`ls /etc/apache2/sites-available | grep ecomap.conf`
 
if [[ -n  $state_conf ]]
  then
    rm --force /etc/apache2/sites-available/ecomap.conf
fi
