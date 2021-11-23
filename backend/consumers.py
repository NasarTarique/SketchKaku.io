import json
import string
import random
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):

    # connect to room group
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_room_name = 'chat_%s'%self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.group_room_name,
            self.channel_name
        )
        self.accept()
    
    # Delete room group
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_room_name,
            self.channel_name
        )

    # receive message from websocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        drawpath = text_data_json["drawpath"]
        backgroundfill = text_data_json["backgroundfill"]
        strokecolor = text_data_json["strokecolor"]
        async_to_sync(self.channel_layer.group_send)(
            self.group_room_name,
            {
                "type":"chat_message",
                "message":message,
                "drawpath":drawpath,
                "backgroundfill":backgroundfill,
                "strokecolor":strokecolor
            }
        )

    # receive message from room_group
    def chat_message(self, event):
        message  = event["message"]
        drawpath = event["drawpath"]
        backgroundfill = event["backgroundfill"]
        strokecolor = event["strokecolor"]
        self.send(text_data=json.dumps({
            "message":message,
            "drawpath":drawpath,
            "backgroundfill":backgroundfill,
            "strokecolor":strokecolor
        }))
