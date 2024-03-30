from .models import Topic, Lesson, VideoLanguage
from rest_framework import serializers

class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lesson
        fields = '__all__'

class VideoLanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = VideoLanguage
        fields = '__all__'