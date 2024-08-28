from django.shortcuts import render
from rest_framework import generics
from .models import Auto
from .serializers import AutoSerializer

# Create your views here.

class AutoAPIView(generics.ListAPIView):
    queryset = Auto.objects.all()
    serializer_class = AutoSerializer