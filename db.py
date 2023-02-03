import sqlite3
from flask import *

client_ip = str(request.access_route)

# Creates a connection to the database names Client_req_logs
conn = sqlite3.connect("IP_Req_Logs.db")
print("opened database successfully");

# Creates a cursor object that allows interaction with database and add records
cursor = conn.cursor()

# Creates a table 
cursor.execute("""CREATE TABLE client_ip (
    client_ip TEXT PRIMARY KEY
    
    )
    """)
print("IP table created successfully");

# commit our command
conn.commit()

# close our connection
conn.close()
