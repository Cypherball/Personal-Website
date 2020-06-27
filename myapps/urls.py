#from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.apps_list, name='myapps-appsList'),
    path('mlOCR/', views.mlOCR, name='myapps-mlOCR'),
]