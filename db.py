import sqlite3

# Creates a connection to the database names Client_req_logs
conn = sqlite3.connect("Client_req_logs.db")

# Creates a cursor object that allows interaction with database and add records
cursor = conn.cursor()

# Creates a table 
cursor.execute("""CREATE TABLE ips 
    )
