from django.contrib import admin
from .models import Record, Relation, Message, DayReport
# Register your models here.


admin.site.register(Record)
admin.site.register(Relation)
admin.site.register(Message)
admin.site.register(DayReport)
