from .models import Topics, Lesson, VideoLanguage
from rest_framework import serializers

class TopicsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topics
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lesson
        fields = '__all__'

class VideoLanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = VideoLanguage
        fields = '__all__'