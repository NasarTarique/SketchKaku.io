from django.urls import path
from . import views

urlpatterns = [
    path('',views.index),
    path('chatroomcreate/', views.ChatroomCreateView.as_view())
]
