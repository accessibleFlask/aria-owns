# -*- coding: utf-8 -*-
import os

from flask import Flask, flash, render_template, request, current_app
from sassutils.wsgi import SassMiddleware

from app import app
from app.forms import EmailOnlyForm, EmailAndCheckboxForm, EmailCheckboxRadioSelectForm

GET = 'GET'
POST = 'POST'

''' Adding a cache-buster to combat issues with aggressive caching '''
@app.url_defaults
def hashed_url_for_static_file(endpoint, values):
    if 'static' == endpoint or endpoint.endswith('.static'):
        filename = values.get('filename')
        if filename:
            if '.' in endpoint:  # has higher priority
                blueprint = endpoint.rsplit('.', 1)[0]
            else:
                blueprint = request.blueprint  # can be None too

            if blueprint:
                static_folder = app.blueprints[blueprint].static_folder
            else:
                static_folder = app.static_folder

            param_name = 'h'
            while param_name in values:
                param_name = '_' + param_name
            values[param_name] = static_file_hash(os.path.join(static_folder, filename))

def static_file_hash(filename):
    return int(os.stat(filename).st_mtime)

with app.app_context():
    # within this block, current_app points to app.
    print current_app.name

app.wsgi_app = SassMiddleware(app.wsgi_app, {
    'app': ('static/styles', 'static/css', '/static/css')
})

@app.route('/', methods=[GET])
def home():
    return render_template('home.html')

@app.route('/slide-1/', methods=[GET])
def slide_1():
    return render_template('slide1.html')

@app.route('/slide-2/', methods=[GET])
def slide_2():
    return render_template('slide2.html')

@app.route('/slide-3/', methods=[GET])
def slide_3():
    return render_template('slide3.html')

@app.route('/slide-4/', methods=[GET])
def slide_4():
    form = EmailOnlyForm(request.form)
    return render_template('slide4.html', form=form)

@app.route('/slide-4/', methods=[POST])
def post_slide_4():
    form = EmailOnlyForm(request.form)
    if form.validate():
        default_flash()
    return render_template('slide4.html', form=form)

@app.route('/slide-5/', methods=[GET])
def slide_5():
    form = EmailCheckboxRadioSelectForm(request.form)
    return render_template('slide5.html', form=form)

@app.route('/slide-5/', methods=[POST])
def post_slide_5():
    form = EmailCheckboxRadioSelectForm(request.form)
    if form.validate():
        default_flash()
    return render_template('slide5.html', form=form)

@app.route('/slide-6/', methods=[GET])
def slide_6():
    form = EmailCheckboxRadioSelectForm(request.form)
    return render_template('slide6.html', form=form)

@app.route('/slide-6/', methods=[POST])
def post_slide_6():
    form = EmailCheckboxRadioSelectForm(request.form)
    if form.validate():
        default_flash()
    else:
        flash(u'Please correct the errors highlighted below', 'error')
    return render_template('slide6.html', form=form)

@app.route('/slide-7/', methods=[GET])
def slide_7():
    form = EmailCheckboxRadioSelectForm(request.form)
    return render_template('slide7.html', form=form)

@app.route('/slide-7/', methods=[POST])
def post_slide_7():
    form = EmailCheckboxRadioSelectForm(request.form)
    if form.validate():
        default_flash()
    return render_template('slide7.html', form=form)

@app.route('/slide-8/', methods=[GET])
def slide_8():
    form = EmailCheckboxRadioSelectForm(request.form)
    return render_template('slide8.html', form=form)

@app.route('/slide-8/', methods=[POST])
def post_slide_8():
    form = EmailCheckboxRadioSelectForm(request.form)
    if form.validate():
        default_flash()
    else:
        flash(u'Please correct the errors highlighted below', 'error')
    return render_template('slide8.html', form=form)

@app.route('/slide-9/', methods=[GET])
def slide_9():
    form = EmailCheckboxRadioSelectForm(request.form)
    return render_template('slide9.html', form=form)

@app.route('/slide-9/', methods=[POST])
def post_slide_9():
    form = EmailCheckboxRadioSelectForm(request.form)
    if form.validate():
        default_flash()
    else:
        flash(u'Please correct the errors highlighted below', 'error')
    return render_template('slide9.html', form=form)

@app.route('/slide-10/', methods=[GET])
def slide_10():
    return render_template('slide10.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

def default_flash():
    flash(u'(☞ﾟヮﾟ)☞', 'decoration')
    flash(u'Thanks for registering with us! Look in your email for a confirmation!', 'success')
