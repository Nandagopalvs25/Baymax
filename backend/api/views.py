from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.views import APIView

# Create your views here.


def index(request):
    return HttpResponse("Hello WOrld")

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RecordView(APIView):
   
    def post(self, request, format=None):
           userr=User.objects.get(id=request.user.id)
           print(userr.id)
           return HttpResponse("SUcess")