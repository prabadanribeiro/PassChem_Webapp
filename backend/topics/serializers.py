from .models import Topics, Lesson
from rest_framework import serializers

class TopicsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topics
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lesson
        fields = '__all__'