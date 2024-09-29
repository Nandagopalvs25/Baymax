from django.contrib import admin
from django.urls import path, include
from .views import index, UserList, RecordView, RelationView, AiChatView, CreateReportView


urlpatterns = [

    path('index/', index),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/register/', include('dj_rest_auth.registration.urls')),
    path("users/", UserList.as_view()),
    path("records/", RecordView.as_view()),
    path("relation/", RelationView.as_view()),
    path("aichat/", AiChatView.as_view()),
    path("createReport/", CreateReportView.as_view())




]
