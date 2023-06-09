from werkzeug.security import generate_password_hash, check_password_hash

from datetime import datetime
from secrets import token_urlsafe
from app import db





class Admin(db.Model):
    admin_id = db.Column(db.Integer, primary_key=True)
    adminname = db.Column(db.String(60), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))
    events = db.relationship('Event', backref='author', lazy=True)
    token = db.Column(db.String(250), unique=True)

    def __repr__(self):
        return f'Admin: {self.adminname}'
    
    def commit(self):
        db.session.add(self)
        db.session.commit()

    def hash_password(self,password):
        return generate_password_hash(password)

    def check_password(self,password):
        return check_password_hash(self.password, password)
    
    def add_token(self):
        setattr(self,'token',token_urlsafe(32))
    
    def get_id(self):
        return str(self.admin_id)
    
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))
    usertoken = db.Column(db.String(250), unique=True)

    def __repr__(self):
        return f'User: {self.username}'
    
    def commit(self):
        db.session.add(self)
        db.session.commit()

    def hash_password(self,password):
        return generate_password_hash(password)

    def check_password(self,password):
        return check_password_hash(self.password, password)
    
    def add_usertoken(self):
        setattr(self,'usertoken',token_urlsafe(32))
    
    def get_id(self):
        return str(self.user_id)
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    img = db.Column(db.String(250))
    date = db.Column(db.String(250))
    time = db.Column(db.String(250))
    location = db.Column(db.String(250))
    name = db.Column(db.String(250))    
    artist = db.Column(db.String(100))
    desc = db.Column(db.String(300))
    active = db.Column(db.Boolean, default=True, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    admin_id = db.Column(db.Integer, db.ForeignKey('admin.admin_id'), nullable=False)

    def __repr__(self):
        return f'<Event: {self.name}>'
    
    def commit(self):
        db.session.add(self)
        db.session.commit()