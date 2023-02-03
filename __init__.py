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


@app.route("/get_my_ip", methods=["GET"])
def get_my_ip():
    return jsonify({'ip': request.access_route}), 200


# Creates a connection to the database names Client_req_logs
conn = sqlite3.connect("IP_Req_Logs.db")
print("opened database successfully");

# Creates a cursor object that allows interaction with database and add records
cursor = conn.cursor()

# Creates a table
#cursor.execute (
 #   "INSERT INTO ips VALUES"
#)

print("IP table created successfully");

# commit our command
conn.commit()

# close our connection
conn.close()


@app.route("/get_my_date", methods=["GET"])
def get_my_date():
    return jsonify({'Date': request.date}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0')
