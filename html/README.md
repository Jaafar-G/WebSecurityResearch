# Research: Bot Detector

> In this research we present different bot activity and patterns followed by the security threats to the users


## Table of Contents (Optional)

## Installation 

<a href= "https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04"> Ngnix Set up </a>

<a href= "https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu/"> MongDB Set up </a>

<a href= "http://ctrtard.com/code/how-to-install-the-maxmind-geoip2-database-for-php/"> GeoIP Set up </a>

<a href = "https://www.php.net/manual/en/book.geoip.php"> GeoIP Docs </a>


## Mongo Info:

mongod --auth

mongo --port 27017 -u "pwnuno" --authenticationDatabase "botDetector" -p 

## Restart service

sudo service mongod start && mongod

sudo service mongod status

sudo netstat -tulpn | grep :27017

sudo kill -9 <pid>



## Queries Example:


## View Distinct IPs


> db.requestHeader.distinct("ip");
[
	"137.30.126.213",
	"172.56.27.42",
	"54.157.150.151",
	"193.107.99.251"
]



