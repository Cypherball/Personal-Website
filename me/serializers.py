from rest_framework import serializers
from .models import Projects, Education

class ProjectsSerializer(serializers.ModalSerializer):
    class Meta:
        model = Projects
        fields = '__all__'

class EducationSerializer(serializers.ModalSerializer):
    class Meta:
        model = Education
        fields = '__all__'