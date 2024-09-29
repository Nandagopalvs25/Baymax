from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Record,DayReport


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ["name", "date", "summary", "url"]

class DayReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayReport
        fields = ["user", "date", "summary"]
