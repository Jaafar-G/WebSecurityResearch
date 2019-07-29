#!/bin/sh
DIR=`date +%m%d%y`
DEST=/var/www/backup-dbs/$DIR
mkdir $DEST
mongodump -h localhost -d botDetector -u pwnuno -p a#nsus6y3! -o $DEST
