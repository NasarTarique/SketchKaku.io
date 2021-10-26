from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework import status
from .serializers import ChatroomsSerializer
from .models import Chatrooms
import json

# Create your views here.

def index(request):
    return JsonResponse({"foo":"hello"})


# chatroom model -> room id -> room name -> public
class ChatroomCreateView(ListCreateAPIView):
    queryset = Chatrooms.objects.all()
    serializer_class = ChatroomsSerializer
    def create(self,request):
        print(request.data)
        room_name = request.POST.get('room_name')
        room_id = room_name 
        room_type = request.POST.get('room_type',False)
        obj = Chatrooms(room_id=room_id,room_name=room_name,public=room_type)
        obj.save()
        resp = {
            'room_name':room_name,
            'room_id':room_id,
            'public':room_type
        }
        return Response(resp, status=status.HTTP_201_CREATED)


         

