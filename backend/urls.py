from django.urls import path
from . import views

urlpatterns = [
    path('',views.index),
    path('chatroomcreate/', views.ChatroomCreateView.as_view()),
    path('roomalive/<str:rid>/',views.RoomAliveView.as_view())
]
