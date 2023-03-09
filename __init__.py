from flask import Flask, render_template
from flask import jsonify
from flask import request
import time
import datetime
import smtplib
import uuid
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
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


def send_mail():
    # Setting up the email parameters
    sender = 'sender@email.com'
    recipient = 'testsubject@email.com'
    subject = 'Test Email'
    body = 'this is a test email.'
    unique_identifier = 0

    # Connection to the SMTP Server (sample information)
    smtp_server = 'smtp.email.com'
    smtp_port = 80
    smtp_username = 'sender@email.com'
    smtp_password = 'sender1@1Trackerapp_123'

    # Creation of the email message with all contents
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(body))
    img = MIMEImage(unique_identifier)
    img.add_header('Content-ID', '<tracking_pixel>')
    msg.attach(img)

    # execution of the function send_mail
    # starts with creation of server object
    # then creates a TLS encryption for connection
    # after the function logs into the SMTP server
    # last line is for actually sending the email
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())


@app.route('/get_ip')
def get_ip_requests():
    # First we create a Unique ID using the UUID function from uuid
    # the id is converted to a string and placed in the variable unique_id
    # the page then displays the template of unique_id
    unique_id = str(uuid.uuid4())
    return render_template('unique_id.html', unique_id=unique_id)

    # creates the variable for the ip address
    ip = request.access_route
    # calls the log_ip function to log each address
    log_ip(ip)
    conn = sqlite3.connect('ips.db')
    c = conn.cursor()
    # selects the ip addresses from the database table
    c.execute("SELECT ip_logs FROM ip_logs")
    # connection is then closed
    conn.close()


if __name__ == "__main__":
    app.run(host='0.0.0.0')
