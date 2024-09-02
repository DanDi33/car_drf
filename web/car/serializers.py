from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from .models import Country, Producer, Auto, Message
from rest_framework import generics


class MessageSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Message
        fields = '__all__'

class AutoSerializer(serializers.ModelSerializer):
    producer_name = serializers.SerializerMethodField()
    message_count = serializers.SerializerMethodField()
    class Meta:
        model = Auto
        fields = '__all__'

    def get_producer_name(self, obj):
        return obj.producer.name

    def get_message_count(self, obj):
        return Message.objects.filter(auto=obj).count()

class ProducerSerializer(serializers.ModelSerializer):
    cars = AutoSerializer(many=True, read_only=True)
    country_name = serializers.SerializerMethodField()

    class Meta:
        model = Producer
        fields = ['id', 'name', 'country_name', 'country', 'cars']

    def get_country_name(self, obj):
        return obj.country.name
       

class CountrySerializer(serializers.ModelSerializer):
    producers = ProducerSerializer(many=True, read_only=True)

    class Meta:
        model = Country
        # fields = '__all__'
        fields = ['id', 'name', 'producers']    
    

# class AutoSerializer(serializers.Serializer):
#     name = serializers.CharField(max_length = 255)
#     start_year = serializers.IntegerField()
#     finish_year = serializers.IntegerField()
#     producer_id = serializers.IntegerField()
    
#     def create(self, validated_data):
#         return Auto.objects.create(**validated_data)
    
#     def update(self, instance, validated_data):
#         instance.name = validated_data.get('name', instance.name)
#         instance.start_year = validated_data.get('start_year', instance.start_year)
#         instance.finish_year = validated_data.get('finish_year', instance.finish_year)
#         instance.producer_id = validated_data.get('producer_id', instance.producer_id)
#         instance.save()
#         return instance      
   
   
   
# class AutoModel:
#     def __init__(self, name):
#         self.name = name  
    
# def encode():
#     model = AutoModel('Bmw')
#     model_sr = AutoSerializer(model)
#     print(model_sr.data, type(model_sr.data), sep='\n')
#     json = JSONRenderer().render(model_sr.data)
#     print(json)