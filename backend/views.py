from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework import status
from .serializers import ChatroomsSerializer
from .models import Chatrooms
import json

# Create your views here.

def index(request):
    return JsonResponse({"foo":"hello"})

# checking if room is on  
class RoomAliveView(APIView):
    def get(self, request, rid):
        roomid =  rid
        try:
            obj  = Chatrooms.objects.get(room_id=roomid)
        except Exception as e:
            return Response(status=status.HTTP_418_IM_A_TEAPOT)
        objserializer = ChatroomsSerializer(obj)
        return Response(objserializer.data,status=status.HTTP_200_OK)
            

        


class ChatroomCreateView(ListCreateAPIView):
    queryset = Chatrooms.objects.all()
    serializer_class = ChatroomsSerializer
    def create(self,request):
        room_name = request.data.get('roomname')
        room_id = room_name 
        room_type = request.data.get('roomtype',False)
        obj = Chatrooms(room_id=room_id,room_name=room_name,public=room_type)
        obj.save()
        resp = {
            'roomname':room_name,
            'roomid':room_id,
            'roomtype':room_type
        }
        return Response(resp, status=status.HTTP_201_CREATED)


         

