from django.db import models

# Create your models here.
class Chatrooms(models.Model):
    room_id = models.CharField(max_length=20,unique=True)
    room_name = models.CharField(max_length=20)
    public = models.BooleanField(default=False) 
