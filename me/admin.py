from django.contrib import admin
from .models import *

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 2

class SkillCategoryAdmin(admin.ModelAdmin):
    model = SkillCategory
    inlines = [SkillInline]

admin.site.register(About)
admin.site.register(Education)
admin.site.register(Certifications)
admin.site.register(Projects)
admin.site.register(SkillCategory, SkillCategoryAdmin)
admin.site.register(Contact)
admin.site.register(ClientMail)