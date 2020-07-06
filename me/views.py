from django.shortcuts import render
from .models import Projects, Education, About, Skill, SkillCategory, Certifications, Contact
#from django.http import HttpResponse



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
    data = {
        'title':'Portfolio'
    }
    return render(request, 'me/portfolio.html', data)
