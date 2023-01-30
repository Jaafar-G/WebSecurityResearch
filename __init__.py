from flask import Flask
from flask import jsonify
from flask import request

config = {
        "DEBUG": True # run app in debug mode
        }

app = Flask(__name__)

@app.route("/")  # this sets the route to this page
def home():
    return jsonify({'Msage': "Testing"})


@app.route("/get_my_ip", methods=["GET"])
def get_my_ip():
    return jsonify({'ip': request.access_route}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0')

