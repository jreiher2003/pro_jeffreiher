# -*- coding: utf-8 -*-
from flask import render_template
from jreiher import app

@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')

@app.route('/blog')
def blog():
	return render_template('blog.html')

@app.route('/projects')
def project():
	return render_template('projects.html')