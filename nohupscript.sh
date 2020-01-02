
sudo systemctl enable nginx

sudo systemctl start nginx

sudo systemctl enable mongod

sudo systemctl start mongod

sudo mongod --port 27017 --dbpath /data/db/

