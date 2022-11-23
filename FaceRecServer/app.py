from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app)

@socketio.on("test")
def print_test(message):
    print("Yoooooooo")
    print(message)
    emit("hi","Hello wooop")

@socketio.event
def my_event(message):
    emit('my response', {'data': 'got it!'})

if __name__ == '__main__':
    socketio.run(app,debug=True)