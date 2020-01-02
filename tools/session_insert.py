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
    print("---------------------------------------------")
    fpath = os.path.join(path, file)
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
    find_existing = {"session_id":file}
    old_id = None
    old_first_seen_time = None
    for x in col.find(find_existing):
        old_id = x['_id']
        if 'first_seen_time' in x:
            old_first_seen_time = x['first_seen_time']
    if old_id is not None and old_first_seen_time is not None:
        diff = int(last_seen_time) - int(old_first_seen_time)
        query = { "ip":client_ip, "first_seen_time":old_first_seen_time, "last_seen_time":last_seen_time, "diff": diff, "session_id":file}
        doc = col.update_one({'_id':old_id},{'$set':query}, upsert=False)
        if doc is None:
            print("No update made: {} ".format(query))
        else:
            print("Exisiting data update successful {}".format(query))
    else:
        diff = int(last_seen_time) - int(first_seen_time)
        query = {"ip":client_ip, "first_seen_time":first_seen_time, "last_seen_time":last_seen_time, "diff": diff, "session_id":file}
        doc = col.insert_one({"ip":client_ip, "first_seen_time":first_seen_time, "last_seen_time":last_seen_time, "diff": diff, "session_id":file})
        if doc is None:
            print("No insert made: {}".format(query))
        else:
            print("Insert successful {}".format(query))
    os.remove(fpath)
    print("Deleted session file {}".format(fpath))
    print("---------------------------------------------")

