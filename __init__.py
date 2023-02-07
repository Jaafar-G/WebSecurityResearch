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
    # Creates a connection to the database names Client_req_logs
    conn = sqlite3.connect("ips.db")
    print("opened database successfully");

    # Creates a cursor object that allows interaction with database and add records
    cursor = conn.cursor()

    # Creates a table
    conn.execute('''CREATE TABLE IF NOT EXISTS ip_logs 
    (ID INTEGER PRIMARY KEY AUTOINCREMENT, ip_logs TEXT NOT NULL)''')

    # insert the IP addresses into the database
    conn.execute("INSERT INTO ip_logs VALUES (?)", (ip,))
    conn.commit()

    # close our connection
    conn.close()


@app.route('/get_ip_requests')
def get_ip_requests():
    conn = sqlite3.connect('ips.db')
    c = conn.cursor()
    c.execute("SELECT ip_logs FROM ip_logs")
    ips = [row[0] for row in c.fetchall()]
    conn.close()
    return jsonify(ips), 200


@app.route("/get_my_date", methods=["GET"])
def get_my_date():
    return jsonify({'Date': request.date}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0')
