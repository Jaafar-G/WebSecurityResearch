from flask import Flask
from flask import jsonify
from flask import request

config = {
        "DEBUG": True # run app in debug mode
        }

app = Flask(__name__)
app.secret_key = "jdsfau374bb3f734hf4f37434yf9"

@app.route("/")  # this sets the route to this page
def home():
    return jsonify({'Message': "Testing"})


@app.route("/get_my_ip", methods=["GET"])
def get_my_ip():
    return jsonify({'ip': request.access_route}), 200


@app.route("/get_my_date", methods=["GET"])
def get_my_date():
        return jsonify({'Date': request.date}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0')

