# PyOhio 2017: aria-owns="lets-make-forms-accessible"

This is the public repo for `aria-owns="lets-make-forms-accessible"`.

----------


## Setup

### Requirements

 - Python 2.7
 - pip
 - virtualenv

### Installation

Create a virtualenv and install:
```
$ virtualenv --python=$path/to/python2.7 venv
$ source venv/bin/activate
(venv) $ pip install -r requirements.txt
```

### Configuration

This app is set up to use sessions in order to gain access to message flashing.  Since this app is a simple app and not necessarily meant to be well-secured, the app is looking for a file with `SECRET_KEY` in it at `$pwd/app/config/settings.cfg`.

The authors are aware this is not a best practice.  This is purely for demonstration purposes.

### Get started!
```
$ export FLASK_APP=$pwd/run.py
(venv) $ flask run
```

