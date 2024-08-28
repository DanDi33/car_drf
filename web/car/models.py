from django.db import models
from django.utils import timezone

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length = 255)

    def __str__(self):
        return self.name


class Producer(models.Model):
    name = models.CharField(max_length = 255)

    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.name

class Auto(models.Model):
    name = models.CharField(max_length = 255)
    start_year = models.IntegerField(default=2000)
    finish_year = models.IntegerField(default=2024)

    producer = models.ForeignKey(Producer, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.name


class Message(models.Model):
    email = models.EmailField()
    comment = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    auto = models.ForeignKey(Auto, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.comment[:50]
