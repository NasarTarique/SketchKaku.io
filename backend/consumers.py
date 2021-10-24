import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    # connect to room group
    def connect(self):
        pass
    
    # disconnect from room group 
    def disconnect(self, close_code):
        pass

    # receive message from websocket
    def receive(self, text_code):
        pass

    # receive message from room_group
    def chat_message(self, event):
        pass
