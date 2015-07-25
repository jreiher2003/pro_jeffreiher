from flask import render_template
from jreiher import app

@app.route('/')
def index():
    return render_template('index.html')
    # return 'Hello Jeffrey'