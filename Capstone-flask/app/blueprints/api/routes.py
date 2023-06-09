from flask import request, jsonify


from . import bp
from app.models import Event

from app.blueprints.api.helpers import admin_token_required

@bp.post('/event')
@admin_token_required
def make_event(admin):
    try:
        content = request.json
        event= Event(name=content.get('name'),active=content.get('active'), artist=content.get('artist'),date=content.get('date'),time=content.get('time'), location=content.get('location'), img=content.get('img'), desc=content.get('desc'),admin_id=admin.admin_id)
        event.commit()
        return jsonify([{'message': 'event created', 'name':event.name}])
    except:
        return jsonify([{'message':'invalid form data'}])

@bp.put('/event')

def hide_or_show_event():
    try:
        content = request.json
        event = Event.query.get_or_404(content.get('id'))
        event.active = content.get('active')
        event.commit()
        return jsonify([{'message': 'ok'}])

    except:
        return jsonify([{'message':'invalid form data'}])



@bp.get('/events')
# @token_required
def api_events():
    result = []
    events = Event.query.all()
    for event in events:
        result.append({
            'id':event.id,
            'active':event.active,
            'img':event.img,
            'date': event.date,
            'time': event.time,
            'location': event.location,
            'name':event.name,
            'artist': event.artist,
            'desc':event.desc,
            'timestamp':event.timestamp, 
            'admin':event.author.adminname

            })
    return jsonify(result), 200

@bp.get('/event/<event_id>')
# @token_required
def get_event(event, event_id):
    try:
      event = Event.query.get(event_id)
      return jsonify([{
            'id':event.id,
            'active':event.active,
            'img':event.img,
            'date': event.date,
            'time': event.time,
            'location': event.location,
            'name':event.name,
            'artist': event.artist,
            'desc':event.desc,
            'timestamp':event.timestamp, 
            'admin':event.author.adminname
                }])
    except: 
      return jsonify([{'message':'Invalid Event Id'}]), 404