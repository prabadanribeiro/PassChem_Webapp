from .models import Unit, Topic, Lesson, VideoSetting, UserLesson, UserTopic, UserUnit
from rest_framework import serializers

class UnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Unit
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lesson
        fields = '__all__'

class VideoSettingSerializer(serializers.ModelSerializer):

    class Meta:
        model = VideoSetting
        fields = '__all__'

class UserTopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserTopic
        fields = '__all__'

class UserLessonSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserLesson
        fields = '__all__'

class UserUnitSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserUnit
        fields = '__all__'