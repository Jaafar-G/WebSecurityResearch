from flask import Flask
from flask import jsonify
from flask import request
import sqlite3

config = {
        "DEBUG": True  # run app in debug mode
        }


app = Flask(__name__)
app.secret_key = "jdsfau374bb3f734hf4f37434yf9"


@app.route("/")  # this sets the route to this page
def home():
    return jsonify({'Message': "Testing"})


def log_ip(ip):
    ip = request.access_route
    # Creates a connection to the database names Client_req_logs
    conn = sqlite3.connect("ips.db")
    print("opened database successfully");

    # Creates a cursor object that allows interaction with database and add records
    cursor = conn.cursor()

    # Creates a table with two columns ID which is the request number and ip-logs which is the ip address
    conn.execute('''CREATE TABLE IF NOT EXISTS ip_logs 
    (ID INTEGER PRIMARY KEY AUTOINCREMENT, ip_logs TEXT NOT NULL)''')

    # insert the IP address as a string into the ip_logs table
    ip_string = ','.join(ip)
    conn.execute("INSERT INTO ip_logs (ID, ip_logs) VALUES (NULL, ?)", (ip_string,))
    conn.commit()

    # close our connection
    conn.close()


@app.route('/get_ip')
def get_ip_requests():
    # creates the variable for the ip address
    ip = request.access_route
    # calls the log_ip function to log each address
    log_ip(ip)
    conn = sqlite3.connect('ips.db')
    c = conn.cursor()
    # selects the ip addresses from the database table
    c.execute("SELECT ip_logs FROM ip_logs")
    # creates a list that stores the ip addresses from table
    ips = [row[0] for row in c.fetchall()]
    conn.close()
    # displays the list of ip addresses
    return jsonify(ips), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0')
