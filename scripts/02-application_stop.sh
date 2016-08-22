#!/bin/bash

state_apache=`pgrep apache2`

if [[ -n  $state_apache ]]
  then
    service apache2 stop
fi
