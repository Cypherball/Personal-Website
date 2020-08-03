from django.shortcuts import render
from django.http import HttpResponse, Http404


def apps_list(request):
    data = {
        'title': 'Apps',
    }
    return render(request, 'myapps/apps_list.html', data)


def mlOCR(request):
    data = {
        'title': 'OCR'
    }
    return render(request, 'myapps/mlOCR.html', data)


def sortingVisualization(request):
    data = {
        'title': 'Sorting Visualization'
    }
    return render(request, 'myapps/sorting_visualization.html', data)



