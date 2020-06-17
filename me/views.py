from django.shortcuts import render
from .models import Projects, Education, About, Skill, SkillCategory
#from django.http import HttpResponse



def home(request):
    skills = list()
    for c in SkillCategory.objects.all():
        skills.append(Skill.objects.filter(category=c))
        
    data = {
        'title': 'Home',
        'projects': Projects.objects.all(),
        'education': Education.objects.all(),
        'about': About.objects.last(),
        'skills': skills
    }
    
    return render(request, 'me/home.html', data)

def portfolio(request):
    return render(request, 'me/portfolio.html', {'title':'Portfolio'})
