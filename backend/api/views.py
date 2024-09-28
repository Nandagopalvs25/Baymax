from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,RecordSerializer
from rest_framework.views import APIView
from .models import Record,Relation
import os
import google.generativeai as genai
import requests
import gdown
from django.core.mail import send_mail


# Create your views here.


def index(request):
    return HttpResponse("Hello WOrld")

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RecordView(APIView):
   
    def post(self, request, format=None):
           userr=User.objects.get(id=request.user.id)
           name=request.data["name"]
           url=request.data["url"]
           date=request.data["date"]
           record_type=request.data["record_type"]
           genai.configure(api_key="AIzaSyAReSsBnxu2I5DXaqfLtmOq7Y9Tfa0Wjsg")
           generation_config = {
             "temperature": 1,
              "top_p": 0.95,
              "top_k": 64,
              "max_output_tokens": 8192,
              "response_mime_type": "text/plain",
            }
           
           model = genai.GenerativeModel(
                  model_name="gemini-1.5-flash",
                  #   system_instruction="You are Baymax A Personal Healthcare assistant",
                  generation_config=generation_config,
           )
           
           download_pdf_from_drive(url,'downloaded.pdf')
           sample_pdf = genai.upload_file('downloaded.pdf')
           response = model.generate_content(["Generate summary.", sample_pdf])
           print(response.text)
           
           Record.objects.create(user=userr,name=name,url=url,date=date,record_type=record_type,summary=response.text)
           print(userr.id)
           return HttpResponse("SUcess")
       
       
    def get(self,request):
         userr=User.objects.get(id=request.user.id)
         print(userr.id)
         records=Record.objects.filter(user=userr)
         records_data=RecordSerializer(records,many=True)
         return JsonResponse(records_data.data,safe=False)
         
    


class RelationView(APIView):
   
    def post(self, request, format=None):
           userr=User.objects.get(id=request.user.id)
           grelative=User.objects.get(id=request.data['id'])
           grelation_type=request.data["relation_type"]
           Relation.objects.create(user=userr,relative=grelative,relation_type=grelation_type)
           return HttpResponse("SUcess")
       
def drive_link_to_download_url(drive_link):
    file_id = drive_link.split('/d/')[1].split('/')[0]
    return f"https://drive.google.com/uc?export=download&id={file_id}"

def download_pdf_from_drive(drive_link, save_path):
    
    download_url = drive_link_to_download_url(drive_link)
    response = requests.get(download_url)
    if response.status_code == 200:
        with open(save_path, 'wb') as file:
            file.write(response.content)
        # print(f"Downloaded PDF to '{save_path}'")
    else:
        print(f"Failed to download the PDF. Status code: {response.status_code}")