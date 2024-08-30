from django.shortcuts import render
from rest_framework import generics
from .models import Country, Producer, Auto, Message
from .serializers import CountrySerializer, ProducerSerializer, AutoSerializer, MessageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class CountryListView(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class CountryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    
    
class ProducerListView(generics.ListCreateAPIView):
    queryset = Producer.objects.all()
    serializer_class = ProducerSerializer

class ProducerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producer.objects.all()
    serializer_class = ProducerSerializer


class AutoAPIList(generics.ListCreateAPIView):
    queryset = Auto.objects.all()
    serializer_class = AutoSerializer
    
class AutoAPIUpdate(generics.UpdateAPIView):
    queryset = Auto.objects.all()
    serializer_class = AutoSerializer
    
    
class MessageListView(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


# class AutoAPIView(generics.ListAPIView):
#     queryset = Auto.objects.all()
#     serializer_class = AutoSerializer

# class AutoAPIView(APIView):
#     def get(self, request):
#         a = Auto.objects.all()
#         return Response({'posts':AutoSerializer(a, many=True).data})
    
#     def post(self, request):
#         serializer = AutoSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'post':serializer.data})
    
#         # post_new = Auto.objects.create(
#         #   name=request.data['name'],
#         #   start_year = request.data['start_year'],
#         #   finish_year = request.data['finish_year'],
#         #   producer_id = request.data['producer_id']
            
#         # )
#         # return Response({'post':AutoSerializer(post_new).data})
        
#     def put(self, request, *args, **kwargs):
#         pk = kwargs.get('pk', None)
#         if not pk:
#             return Response({'error':'Method PUT not allowed'})
        
#         try:
#             instance = Auto.objects.get(pk=pk)
#         except:
#             return Response({'error':'Objects does not exists'})
        
#         serializer = AutoSerializer(data=request.data, instance=instance)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'post':serializer.data})
    
#     def delete(self, request, *args, **kwargs):
#         pk = kwargs.get('pk', None)
#         if not pk:
#             return Response({'error':'Method DELETE not allowed'})
#         try:
#             instance = Auto.objects.get(pk=pk)
#         except:
#             return Response({'error':'Objects does not exists'})   
        
#         instance.delete()
    
#         return Response({'post':"delete post" + str(pk)})

    
    
# class AutoAPIView(generics.ListAPIView):
#     queryset = Auto.objects.all()
#     serializer_class = AutoSerializer