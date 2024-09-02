"""
URL configuration for setup project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from .views import *


urlpatterns = [
    # path('drf-auth', include('rest_framework.urls')),
    
    path('auth/', include('djoser.urls')),
    # re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.authtoken')),
    
    path('countries/', CountryListView.as_view(), name='country-list'),
    path('countries/<int:pk>/', CountryDetailView.as_view(), name='country-detail'),
    
    path('producers/', ProducerListView.as_view(), name='producer-list'),
    path('producers/<int:pk>/', ProducerDetailView.as_view(), name='producer-detail'),
    
    path('autolist', AutoListView.as_view(), name='auto-list'),
    path('autolist/<int:pk>/', AutoDetailView.as_view(), name='auto-detail'),
    
    path('messages/', MessageListView.as_view(), name='message-list'),
    path('messages/<int:pk>/', MessageDetailView.as_view(), name='message-detail')

]