# Research: Bot Detector

> In this research we present different bot activity and patterns followed by the security threats to the users


## Table of Contents (Optional)

## Installation 

<a href= "https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04"> Ngnix Set up </a>

<a href= "https://tech.marksblogg.com/detect-bots-apache-nginx-logs.html"> NGNIX bot set up </a>

<a href= "https://www.fullstackpython.com/nginx.html"> Ngnix Info </a>

<a href= "https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu/"> MongDB Set up </a>

<a href = "https://websiteforstudents.com/install-mongodb-with-apache2-php-7-2-support-on-ubuntu-16-04-17-10-18-04/"> Install PHP and PHP MongoDB Driver </a> 

<a href= "http://ctrtard.com/code/how-to-install-the-maxmind-geoip2-database-for-php/"> GeoIP Set up </a>

<a href = "https://www.php.net/manual/en/book.geoip.php"> GeoIP Docs </a>

## NGNIX Service Start

Ensure apache is not running: sudo /etc/init.d/apache2 stop

sudo fuser -k 80/tcp (For first time to open the port)

sudo systemctl enable nginx.service

sudo systemctl start nginx.service

## Mongo Info:

mongod --auth

mongo --port 27017 -u "pwnuno" --authenticationDatabase "botDetector" -p 

## Restart service

sudo service mongod start && mongod

sudo service mongod status

sudo netstat -tulpn | grep :27017

sudo kill -9 <pid>

Sometime, it does not still let you login, in that case just run "sudo mongod --auth" from another terminal and login. Essentially the problem is in nohup script that does not perform the "sudo mongod --auth"


## Queries Example:

Start mongod
> sudo mongod --port 27017 --dbpath /data/db/

Show dbs
> show dbs

Show collections
> show collections

Find any collection info
> db.requestHeader.find()

Find last insert
> db.requestHeader.find().sort({$natural:-1}).limit(1).pretty() # last entry in collection requestHeader
> db.passiveDNS.find().sort({$natural:-1}).limit(1).pretty() # last entry in collection passiveDNS

Total count
> db.requestHeader.find().count()

Find specific entries:
> db.requestHeader.find({"asn.OrgName":"Google LLC"}).pretty()

Distinct entries of types
> db.requestHeader.distinct("asn.OrgName")

Get Object Insertion Timestamp
> ObjectId("5d011729289bb8bf267b2075").getTimestamp()

Get timestamp of first inserted data
> db.requestHeader.find().sort({_id:1}).limit(1).forEach(function (doc){ print(doc._id.getTimestamp()) })

Get full stats of the collections
> db.requestHeader.stats()

Drop matching collections
> regExp = /sess_/;
db.getCollectionNames().filter(function(name){
  return name.match(regExp)
}).forEach(function(name){
  db.getCollection(name).drop()
});

## Additional Reference in Tools and Set up
<a href ="https://github.com/ba127004/detectbot/blob/master/docs/mitmproxy-setup.pdf"> Mitm Proxy Set up </a>
