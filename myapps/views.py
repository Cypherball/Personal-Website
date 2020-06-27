from django.shortcuts import render
from django.http import HttpResponse, Http404
from .static.myapps.assets.ocr import predictRequest
import json

def apps_list(request):
    data = {
        'title': 'Apps',
    }
    return render(request, 'myapps/apps_list.html', data)

def mlOCR(request):
    data = {
        'title': 'OCR'
    }

    if request.method == 'GET':
        return render(request, 'myapps/mlOCR.html', data)

    if request.method == 'POST':
        #image = request.POST
        return render(request, 'myapps/mlOCR.html', data)

def mlOCRAjax(request):
    if request.is_ajax() and request.POST:
        '''
        if request.method == 'POST':
            response = "Henlo from the server!"
            data = json.dumps(response)
            return HttpResponse(data,content_type="application/json")
        if request.method == 'GET':
            response = "Henlo from the server!"
            data = json.dumps(response)
            return HttpResponse(data,content_type="application/json")
        '''
        data = request.POST.get('imageData')
        prediction = predictRequest.process(data)
        #response = [answer]
        data = json.dumps(prediction)
        return HttpResponse(data,content_type="application/json")
    else:
        raise Http404

