from django.shortcuts import render
from .models import Projects, Education
#from django.http import HttpResponse



def home(request):
    data = {
        'title': 'Home',
        'projects': Projects.objects.all(),
        'education': Education.objects.all()
    }
    return render(request, 'me/home.html', data)

def portfolio(request):
    return render(request, 'me/portfolio.html', {'title':'Portfolio'})
