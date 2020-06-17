from django.db import models
#from django.contrib.auth.models import User

class About(models.Model):
    intro = models.TextField()
    text = models.TextField()
    img = models.URLField(null=True, blank=True)
    extra_text = models.TextField(null=True, blank=True)
    extra_img = models.URLField(null=True, blank=True)

    def has_add_permission(self, request):
        return False if self.model.objects.count() > 0 else super().has_add_permission(request)

    def text_as_list(self):
        return self.text.split('\n')

    def extra_text_as_list(self):
        return self.extra_text.split('\n')
    
    def __str__(self):
        return self.intro


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


class SkillCategory(models.Model):
    category_name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name = "Skill Category"
        verbose_name_plural = "Skill Categories"

class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, on_delete = models.CASCADE)
    skill = models.CharField(max_length=50)
    experience = models.CharField(max_length=30, null=True, blank=True)
    
    def __str__(self):
        return self.skill


class Projects(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField()
    techUsed = models.TextField()
    picDesc = models.URLField()
    link = models.URLField()

    def __str__(self):
        return self.title






