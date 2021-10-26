from rest_framework import serializers
from .models import Chatrooms

class ChatroomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatrooms
        fields = ('room_id','room_name','public')
