from django.shortcuts import render
from django.http import HttpResponse, Http404

def handler404(request, exception, template_name='me/404.html'):
    data = {}
    response = render(request, template_name,data)
    response.status_code = 404
    return response

def handler500(request, template_name='me/500.html'):
    data = {}
    response = render(request, template_name, data)
    response.status_code = 500
    return response