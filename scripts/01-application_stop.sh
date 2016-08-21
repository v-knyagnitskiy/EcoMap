#!/bin/bash

state=`pgrep apache2`

if [[ -n  $state ]]
  then
    service apache2 stop
fi
