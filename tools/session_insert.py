import os
from pymongo import MongoClient
from pymongo import DESCENDING
from pymongo.collection import ReturnDocument

path = '/var/lib/php/sessions'

files = [file for file in os.listdir(path)]
print(files)

first_seen_time = 0
last_seen_time = 0
client_ip = "session_empty"

for file in files:
    fpath = os.path.join(path, file)
    if os.stat(fpath).st_size == 0:
        pass # already defined default
    else:
        with open(fpath, 'r') as f:
            data = f.read()
            #first_seen_time|i:1576200261778;last_seen_time|i:1576200426408;client_ip|s:14:"137.30.126.213"
            splitter = data.split(";")
            datalen = len(splitter)
            counter = 0
            for values in splitter:
                if "first_seen" in values:
                    first_seen_time = (splitter[counter].split("|")[1]).split(":")[1]
                elif "last_seen" in values:
                    last_seen_time = (splitter[counter].split("|")[1]).split(":")[1]
                elif "client_ip" in values:
                    client_ip = ((splitter[counter].split("|")[1]).split(":")[2]).replace("\"", "") 
                counter = counter + 1

    client = MongoClient("mongodb://pwnuno:a#nsus6y3!@127.0.0.1:27017/?authSource=botDetector")
    db = client['botDetector']
    col = db['lifetime']
    diff = int(last_seen_time) - int(first_seen_time)
    query = {"ip":client_ip, "first_seen_time":first_seen_time, "last_seen_time":last_seen_time, "diff": diff, "session_id":file}
    print(query)
    doc = col.insert_one({"ip":client_ip, "first_seen_time":first_seen_time, "last_seen_time":last_seen_time, "diff": diff, "session_id":file})
    if doc is None:
        print("No update made: {}  {}  {} ".format(first_seen_time, last_seen_time, client_ip))
    else:
        print("Update successful {} {} {}".format(first_seen_time, last_seen_time, client_ip))
    os.remove(fpath)

