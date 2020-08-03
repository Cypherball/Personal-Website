from django.shortcuts import render, redirect
from .models import *
from django.http import JsonResponse
from django.utils import timezone
from django.core.mail import send_mail
import json


def home(request):
    skills = list()
    for c in SkillCategory.objects.all():
        skills.append(Skill.objects.filter(category=c))

    data = {
        'title': 'Home',
        'about': About.objects.last(),
        'education': Education.objects.all(),
        'certifications': Certifications.objects.all(),
        'skills': skills,
        'projects': Projects.objects.all(),
        'contact': Contact.objects.last()
    }
    
    return render(request, 'me/home.html', data)


def portfolio(request):
    logos = list()
    logos.append(PortfolioObject.objects.filter(category=PortfolioCategory.objects.filter(category_name='Logos').last()).all())
    print(logos)
    illustrations = list()
    illustrations.append(PortfolioObject.objects.filter(category=PortfolioCategory.objects.filter(category_name='Illustrations')))
    edits = list()
    edits.append(PortfolioObject.objects.filter(category=PortfolioCategory.objects.filter(category_name='Edits')))

    data = {
        'title': 'Portfolio',
        'contact': Contact.objects.last(),
        'logos': logos,
        'illustrations': illustrations,
        'edits': edits
    }
    return render(request, 'me/portfolio.html', data)


def contactFormSubmition(request):
    if request.method == 'POST':
        clientData = json.loads(request.POST.get('data', ''))
        clientName = clientData.get('clientName')
        clientEmail = clientData.get('clientEmail')
        msg = clientData.get('message')
        body = 'Name: ' + clientName + '\n' + 'Email: ' + clientEmail + '\n\n' + msg
        error = False
        response = ''
        try:
            client = ClientMail(time=timezone.now(), name=clientName, email=clientEmail, message=msg)
            client.save()
            send_mail(
                '[nitish-web.dev] Message from ' + clientName,
                body,
                clientEmail,
                ['contact@nitish-web.dev'],
                fail_silently=False,
            )
        except:
            error = True
        
        if not error:
            response = 'success'
        else:
            response = 'error'

        data = {
            'response': response
        }

        return JsonResponse(data, status=200)

    else:
        return redirect('/')
