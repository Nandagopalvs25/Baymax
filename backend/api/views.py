from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, RecordSerializer,DayReportSerializer
from rest_framework.views import APIView
from .models import Record, Relation, Message, DayReport
import os
import google.generativeai as genai
import requests
import gdown
from django.core.mail import send_mail
from django.conf import settings


# Create your views here.


def index(request):
    send_mail("Day Update", "Helloo", settings.EMAIL_HOST_USER,
              ["abhiunni9656@gmail.com"])
    return HttpResponse("Hello WOrld")


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RecordView(APIView):
    def post(self, request, format=None):
        userr = User.objects.get(id=request.user.id)
        print(request.user.id)
        name = request.data["name"]
        url = request.data["url"]
        # record_type=request.data["record_type"]
        genai.configure(api_key="key")
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

        download_pdf_from_drive(url, 'downloaded.pdf')
        sample_pdf = genai.upload_file('downloaded.pdf')
        response = model.generate_content(["Generate summary.", sample_pdf])
        print(response.text)

        Record.objects.create(user=userr, name=name,
                              url=url, summary=response.text)
        print(userr.id)
        return HttpResponse("SUcess")

    def get(self, request):
        userr = User.objects.get(id=request.user.id)
        print(userr.id)
        records = Record.objects.filter(user=userr)
        records_data = RecordSerializer(records, many=True)
        return JsonResponse(records_data.data, safe=False)


class RelationView(APIView):

    def post(self, request):
        userr = User.objects.get(id=request.user.id)
        grelative = User.objects.get(id=request.data['id'])
        grelation_type = request.data["relation_type"]
        Relation.objects.create(
            user=userr, relative=grelative, relation_type=grelation_type)
        return HttpResponse("SUcess")


class AiChatView(APIView):
    def post(self, request):
        userr = User.objects.get(id=request.user.id)
        date = request.data["date"]
        message = request.data["msg"]
        Message.objects.create(user=userr, content=message)
        if date == "":
            records = Record.objects.filter(user=userr)
            messages = Message.objects.filter(user=userr)
            conv_history = ""
            for i in messages:
                conv_history = conv_history+i.content + \
                    "[ message asked on "+i.date.strftime('%m/%d/%Y') + "]"
            summary = ""
            for i in records:
                summary = summary+"\n"
                summary = summary+i.summary
            print(conv_history)
            generation_config = {
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "text/plain",
            }
            genai.configure(api_key="key")
            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction="""You are a ai companion, talk to the user normally, and if the user asks any question about himself you can refere to the context provided. Be a good listener and respons appropriately based on the users message, for questions related to the user refer the chat_history""",
                generation_config=generation_config,
            )
            input_text = f"Context: {summary}\nUser message: {
                message} \nchat_history:{conv_history}"
            response = model.generate_content([input_text]).text
            return HttpResponse(response)

        records = Record.objects.filter(user=userr).filter(date=date)
        messages = Message.objects.filter(user=userr).filter(date=date)
        print(messages)
        conv_history = ""
        for i in messages:
            conv_history = conv_history+i.content + \
                "[ message asked on "+i.date.strftime('%m/%d/%Y') + "]"
        summary = ""
        for i in records:
            summary = summary+"\n"
            summary = summary+i.summary
        print(summary)
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        }
        genai.configure(api_key="key")
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction="""You are a ai companion, talk to the user normally, and if the user asks any question about himself you can refere to the context provided. Be a good listener and respons appropriately based on the users message, for questions related to the user refer the chat_history""",
            generation_config=generation_config,
        )
        input_text = f"Context: {summary}\nUser message: {
            message}\nchat_history:{conv_history}"
        response = model.generate_content([input_text]).text
        return HttpResponse(response)


class CreateReportView(APIView):
    def post(self, request):
        date = request.data["date"]
        userr = User.objects.get(id=request.user.id)
        messages = Message.objects.filter(user=userr, date=date)
        convo_history = ""
        for i in messages:
            convo_history = convo_history+i.content
        print(convo_history)
        genai.configure(api_key="key")
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        }

        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
        )

        message = "Briefly summarize what the user told the bot, can ignore uninmportant questions"
        input_text = f"Convo history: {convo_history}\nInstructions: {message}"

        response = model.generate_content([input_text]).text
        report = DayReport.objects.create(user=userr, summary=response,date=date)
        send_mail("Day Update", response, settings.EMAIL_HOST_USER,
                  ["abhiunni9656@gmail.com"])

        return HttpResponse(response)
    def get(self, request):
        userr = User.objects.get(id=request.user.id)
        print(userr.id)
        reports = DayReport.objects.filter(user=userr)
        records_data = DayReportSerializer(reports, many=True)
        return JsonResponse(records_data.data, safe=False)

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
        print(f"Failed to download the PDF. Status code: {
              response.status_code}")
