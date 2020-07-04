from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
#from .static.myapps.assets.ocr import predictRequest
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
        data = request.POST.get('imageData')
        #prediction = predictRequest.process(data)
        #response = [answer]
        prediction = 'err'
        data = json.dumps(prediction)
        return HttpResponse(data,content_type="application/json")
    else:
        raise Http404

def mlOCRmodel(request):
    filename = 'myapps/static/myapps/assets/ocr/model/model.json'
    #with open(filename,'r') as f:
    #    data = json.load(f) 
    data = open(filename,'r')
    return HttpResponse(data)

