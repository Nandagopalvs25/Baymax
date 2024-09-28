from django.db import models
from django.contrib.auth.models import User,AbstractUser

# Create your models here.
#class CustomUser(AbstractUser):
    #relations


class Record(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=30)
    date=models.DateField(auto_now_add=True)
    url=models.CharField(max_length=300)

    RECORD_TYPE_CHOICES = (
        ('medicalrecord', 'medicalrecord'),
        ('transcripts', 'transcripts'),
        ('photos', 'photos'),
    )

    record_type = models.CharField(max_length=20, choices=RECORD_TYPE_CHOICES,default='transcripts')
    summary=models.TextField(max_length=1000,null=True,blank=True)

    def __str__(self):
        return self.name
    
class Relation(models.Model):
   user=models.ForeignKey(User,related_name='related_to', on_delete=models.CASCADE)
   relative=models.ForeignKey(User,related_name='related_from', on_delete=models.CASCADE)
   RELATION_TYPE_CHOICES = (
        ('father', 'father'),
        ('mother', 'mother'),
        ('sibling', 'sibling'),
    )

   relation_type = models.CharField(max_length=20, choices=RELATION_TYPE_CHOICES,default='father')
   def __str__(self):
        return self.user.username
    