# Ecomap project (by LV-164.UI&LV-173.UI) [![Build Status](https://travis-ci.org/v-knyagnitskiy/EcoMap.svg?branch=dev)](https://travis-ci.org/v-knyagnitskiy/EcoMap)


## About this project

This repository is source code of the small web project, which is named 'EcoMap'. This website allows you to publish information about ecological issues around Ukraine to dynamic map. Officials of the Ministry of Environment use this website to collect info about probldact with citizens, who publish info to this website.  
Website's url - [ecomap.org](http://ecomap.org)

Ecomap Rest Api docimentation [lhalam.github.io/EcoMap/](http://lhalam.github.io/EcoMap)

## Install

We're assumming that you're using bash & you have to install or clone such packages:

*   Install MySQL server on local machine.  
    `sudo apt-get install mysql-server`
*   Install Apache 2 and mod_wsgi lib:  
    `sudo apt-get install -y apache2`  
    `sudo apt-get install libapache2-mod-wsgi`  
    `sudo apt-get install libapache2-mod-wsgi python-dev`  

*   Install MEMCACHE on local machine.  
    `sudo apt-get install memcached`
*   Clone this repository to your local machine.  
    `git clone https://github.com/lhalam/EcoMap.git`
*   Go to the local copy of repository. Open terminal and run the following command  
    `sudo pip install -r requirements.txt`

## Create config files for your application

In order to run your application you need to run config builder which creates all config files.

1.  Go to `'path/to/repo/ecomap/bin/` directory
2.  Run shell script : `./ecomap_config_builder.sh`  
    Default logging level - DEBUG  
    You can run this script with two logging levels:  
    `./ecomap_config_builder.sh -v1` - logging level DEBUG  
    `./ecomap_config_builder.sh -v2` - logging level INFO  
    This script will run config builder in your console.
3.  You will have to type config values, and where it`s possible you can use default one. Example :  

    <pre>    `[apache_project_path] Path to project for apache config [default:None]: /path/to/project/directory 
        [apache_server_admin] Admin email for apache config [default:admin@ecomap.com]: admin@gmail.com
        [apache_server_alias] Server alias for apache config [default:None]: ecomap.new
        [apache_server_name] Server name for apache config [default:None]: www.ecomap.new
        [apache_virtual_host] Virtualhost for apache config [default:None]: ecomap.new
        [db_connection_lifetime] Ecomap database ttl [default:5]: 10
        [db_connection_retries] Number of connection retry [default:3]: 5
        [db_name] Ecomap database name [default:ecomap]: ecomap_db
        [db_retry_delay] Retry delay of ecomap database [default:3]: 5
        [ecomap_admin_user_email] Email for admin user [default:admin@ecomap.com]: admin@gmail.com
        [ecomap_admin_user_password] User password for admin user [default:secre!]: adminpass      
        [ecomap_memcached_servers] List of memcahed servers [default:['127.0.0.1:11211']]: ['198.168.15.66:9000']                                             
        [ecomap_problems_cache_timeout] Cache timeout for problems [default:60]: 180
        [ecomap_secret_key] Secret key for ecomap [default:a7c268ab01141868811c070274413ea3c588733241659fcb]: 2k34knn5ny3j5mg5vm4hgb5jjk4m4v4gb3k4n5bv3hn3n3g0
        [ecomap_static_cache_timeout] Cache timeout for static files [default:86400]: 172800
        [ecomap_unknown_email] Email for unknown user [default:anonymous@ecomap.com]: anonymous@i.ua  
        [ecomap_unknown_first_name] First name for unknown user [default:anonymous]: anon
        [ecomap_unknown_last_name] Last name for unknown user [default:anonymous]: anonimovich
        [ecomap_unknown_nickname] nickname for unknown user [default:anonymous]: anonchik
        [ecomap_unknown_password] Password for unknown user [default:None]: anonpass
        [email_from_address] From email for email distribution [default:ecomaptest@gmail.com]: ecomapmail@i.ua 
        [email_server_name] SMTP server name [default:smtp.gmail.com]: smtp.i.ua
        [email_server_password] Server password for email distribution [default:ecomap_test]: emailpass
        [email_user_name] Email user name for email distribution [default:ecomaptest]: ECOMAP
        [hash_options_lifetime] Config lifetime for password restore [default:900]: 1200
        [log_logger_root_level] Logging level [default:INFO]: DEBUG
        [oauth_facebook_id] Facebook_id for facebook authentication [default:None]: 1000437473365547        
        [oauth_facebook_secret] Facebook_secret for facebook authentication [default:20b8495bdd654cde3e0be0a9ccd8a362]: 45d8d6a2fv1b79hf3f1f5sdw8o46yj61
        [ro_db_host] Read ecomap database server hostname [default:None]: localhost
        [ro_db_password] Read / write ecomap database password [default:None]: 1qaz2wsx3edc
        [ro_db_pool_size] Pool size of ecomap database [default:3]: 6
        [ro_db_port] Read ecomap database port [default:3306]: 9090
        [ro_db_user] Read ecomap database user [default:root]: cat
        [rw_db_host] Read / write ecomap database server hostname [default:None]: localhost
        [rw_db_password] Read / write ecomap database password [default:None]: k3i4i5lm6m6
        [rw_db_pool_size] Read / write pool size of ecomap database [default:3]: 5
        [rw_db_port] Read / write ecomap database port [default:3306]: 8989
        [rw_db_user] Read / write ecomap database user [default:root]: dog`
        </pre>

4.  After this it will create config files in `ecomap/etc/` directory and insert in database admin and anononymous with appropriate data.

## Setupping database locally

1.  Open file /etc/mysql/my.conf with following command: `nano /etc/mysql/my.cnf`
2.  Add following options to this file:  

    <pre>    [mysqld]
        default-character-set = utf8
        init_connect=‘SET collation_connection = utf8_unicode_ci’
        character-set-server = utf8
        collation-server = utf8_unicode_ci

        [client]
        default-character-set = utf8</pre>

3.  Go to 'path/to/repo/ecomap/DB/ecomap/' directory
4.  Run mysql shell: `mysql -u -p`
5.  Run following command: `CREATE DATABASE ecomap_db CHARACTER SET utf8 COLLATE utf8_unicode_ci;` - this command will create database if it's not created yet. Put the name you want instead of 'ecomap_db'
6.  Run following command: `USE ecomap_db;` - this command will set the database you've created earilier as current. Instead of ecomap_db put the name you've chosen earlier
7.  Run following command: `SOURCE CREATE_DB.sql;` - this command will create all tables for database
8.  Run following command: `SOURCE INSERT_DATA.sql;` - this command will populate all data you need for the beginning of work
9.  Now you have working Database!

## Database scheme

![](https://raw.githubusercontent.com/lhalam/EcoMap/STAGE/ecomap_db.png)

## Ecomap application runs on Apache Web Server v2.4

This is a short manual, which tells how to configure WSGI-Flask application and Apache server on your server or local machine.

1.  Enable wsgi mod:  
    `sudo a2enmod wsgi`
2.  Edit your hosts file to create server name alias  
    `sudo gedit /etc/hosts`  
    Add this line to th your host file: `127.0.1.2 ecomap.new`
3.  Run following command:  
    `sudo gedit /etc/apache2/sites-available/ecomap.conf`  
    This command will create file ecomap.conf - this is config file of your site. You can set any name you want!  
    Add content from apache.conf file, which is situated in - `ecomap/etc/_ecomap.apache.conf` to `/etc/apache2/sites-available/ecomap.conf`.
4.  Enable your site:  
    `sudo a2ensite ecomap`
5.  Make your own copy of ecomap.wsgi (situated in `ecomap/www/ecomap.wsgi`). Also read comments in that file, since they are important! This is your main wsgi script which apache will use to run application. It has already configured for our project structure. You can set your own path to templates folder and you'll see test site.
6.  `views.py` - this is main flask application file. All backend code will be written there. You can change everything right now!

## ENVIRONMENT VARIABLES

insert to bashrc

*   export PRODROOT=${PRODROOT:-/home/user/project/EcoMap/ecomap}
*   export PYSRCROOT=${PYSRCROOT:-${PRODROOT}/src/python}
*   export CONFROOT=${CONFROOT:-${PRODROOT}/etc}
*   export PYTHONPATH=${PRODROOT}/src/python
*   export PYTHON=${PYTHON:-/etc/python}
*   export PYTHON_EGG_CACHE=${PYTHON_EGG_CACHE:-/tmp/.python-eggs}
*   export STATICROOT=${STATICROOT:-${PRODROOT}/www/}
