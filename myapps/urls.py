#from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.apps_list, name='myapps-appsList'),
    path('mlOCR/', views.mlOCR, name='myapps-mlOCR'),
    path('mlOCRAjax/', views.mlOCRAjax, name='myapps-mlOCRAjax'),
     path('mlOCR/OCRmodel/', views.mlOCRmodel, name='myapps-mlOCRmodel'),
]