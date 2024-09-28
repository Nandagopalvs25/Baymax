from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Record(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=30)
    date=models.DateField(auto_now_add=True)
    url=models.CharField(max_length=300)

    RECORD_TYPE_CHOICES = (
        ('diagnoses', 'diagnoses'),
        ('medications', 'medications'),
        ('labresult', 'labresult'),
    )

    record_type = models.CharField(max_length=20, choices=RECORD_TYPE_CHOICES,default='labresult')
    summary=models.TextField(max_length=1000,null=True)

    def __str__(self):
        return self.name