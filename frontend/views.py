from django.shortcuts import render

# Create your views here.
def index(request, room_name=''):
    return render(request,'frontend/index.html')
