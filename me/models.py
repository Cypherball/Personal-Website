from django.db import models
#from django.contrib.auth.models import User

class Projects(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField()
    techUsed = models.TextField()
    picDesc = models.URLField()
    link = models.URLField()

    def __str__(self):
        return self.title

class Education(models.Model):
    institution = models.CharField(max_length=255)
    year = models.CharField(max_length=15)
    course = models.TextField()
    board = models.CharField(max_length=50,null=True,blank=True)
    score = models.FloatField()
    scoreFormat = models.CharField(max_length=10)
    logo = models.URLField(null=True, blank=True)
    marksheet = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.institution