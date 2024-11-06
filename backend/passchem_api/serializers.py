from .models import Unit, Topic, Lesson, VideoSetting, UserLesson, UserTopic, UserUnit
from rest_framework import serializers

class UnitSerializer(serializers.ModelSerializer):
    """
    Simple serializer for the Unit model. Exposes all fields for read-only usage.
    """
    class Meta:
        model = Unit
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    """
    Simple serializer for the Topic model. Exposes all fields for read-only usage.
    """
    class Meta:
        model = Topic
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    """
    Simple serializer for the Lesson model. Exposes all fields for read-only usage.
    """
    class Meta:
        model = Lesson
        fields = '__all__'

class VideoSettingSerializer(serializers.ModelSerializer):
    """
    Simple serializer for the VideoSetting model. Exposes all fields for read-only usage.
    """
    class Meta:
        model = VideoSetting
        fields = '__all__'

class UserTopicSerializer(serializers.ModelSerializer):
    """
    Simple serializer for the UserTopic model. Exposes all fields for read-only usage.
    """
    class Meta:
        model = UserTopic
        fields = '__all__'

class UserLessonSerializer(serializers.ModelSerializer):
    """
    Simple serializer for the UserLesson model. Exposes all fields for read-only usage.
    """
    class Meta:
        model = UserLesson
        fields = '__all__'

class UserUnitSerializer(serializers.ModelSerializer):
    """
    Simple serializer for the UserUnit model. Exposes all fields for read-only usage.
    """
    class Meta:
        model = UserUnit
        fields = '__all__'