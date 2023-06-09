from flask import request, jsonify
from flask_cors import cross_origin

from . import bp
from app.models import Admin
from app.models import User

@bp.post('/verify-admin')
def verify_admin():
    content = request.json
    print(content)
    adminname= content['adminname']
    password= content['password']
    admin = Admin.query.filter_by(adminname=adminname).first()
    if admin and admin.check_password(password):
        return jsonify([{'admin token': admin.token}])

@bp.post('/verify-user')
def verify_user():
    content = request.json
    print(content)
    username= content['username']
    password= content['password']
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify([{'user token': user.usertoken}])

@bp.post('/register-admin')
def register_admin():
    content = request.json
    adminname= content['adminname']
    email = content['email']
    password= content['password']
    admin = Admin.query.filter_by(adminname=adminname).first()
    if admin:
        return jsonify[{'message':'Username Taken, Try Again'}]
    admin = Admin.query.filter_by(email=email).first()
    if admin:
        return jsonify[{'message':'Email Taken, Try Again'}]
    admin = Admin(email=email, adminname=adminname)
    admin.password = admin.hash_password(password)
    admin.add_token()
    admin.commit()
    print(admin)
    return jsonify([{'message': f'{admin.adminname} Registered'}])

@bp.post('/register-user')
def register_user():
    content = request.json
    username= content['username']
    email = content['email']
    password= content['password']
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify[{'message':'Username Taken, Try Again'}]
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify[{'message':'Email Taken, Try Again'}]
    user = User(email=email, username=username)
    user.password = user.hash_password(password)
    user.add_usertoken()
    user.commit()
    print(user)
    return jsonify([{'message': f'{user.username} Registered'}])