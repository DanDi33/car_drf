from django.contrib import admin
from .models import Country, Producer, Auto, Message

# Register your models here.

admin.site.register(Country)
admin.site.register(Producer)
admin.site.register(Auto)
admin.site.register(Message)