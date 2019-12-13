import os
from pymongo import MongoClient
from pymongo import DESCENDING
from pymongo.collection import ReturnDocument

path = '/var/lib/php/sessions'

files = [file for file in os.listdir(path)]
print(files)

for file in files:
    fpath = os.path.join(path, file)
    if os.stat(fpath).st_size == 0:
	pass
    else:
	with open(fpath, 'r') as f:
	    data = f.read()
            #first_seen_time|i:1576200261778;last_seen_time|i:1576200426408;client_ip|s:14:"137.30.126.213"
	    splitter = data.split(";")
            first_seen_time = (splitter[0].split("|")[1]).split(":")[1]
            last_seen_time = (splitter[1].split("|")[1]).split(":")[1]
            client_ip = ((splitter[2].split("|")[1]).split(":")[2]).replace("\"", "")
	    client = MongoClient("mongodb://pwnuno:a#nsus6y3!@127.0.0.1:27017/?authSource=botDetector")
            db = client['botDetector']
            col = db['lifetime']
            #query ={"$and":[{"$and":[{"first_seen_time": {"$exists": False}}, {"last_seen_time": {"$exists": False}}]} , {"$and":[{"session_id":file}, {"ip":client_ip}]} ]}
	    #id = col.find_one({"$and":[{"session_id":file}, {"ip":client_ip}]}).get('_id')
            #doc = col.update_one(query, {'$set' : {"ip":client_ip, "first_seen_time":first_seen_time, "last_seen_time":last_seen_time}}, upsert=True)
            doc = col.insert_one({"ip":client_ip, "first_seen_time":first_seen_time, "last_seen_time":last_seen_time, "session_id":file})
            if doc is None:
                print("No update made: {}  {}  {} ".format(first_seen_time, last_seen_time, client_ip))
            else:
                print("Update successful {} {} {}".format(first_seen_time, last_seen_time, client_ip))
    os.remove(fpath)
