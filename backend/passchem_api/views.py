from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Unit, Topic, Lesson, VideoSetting, UserTopic, UserLesson, UserUnit
from .serializers import UnitSerializer, TopicSerializer, LessonSerializer, VideoSettingSerializer, UserLessonSerializer, UserTopicSerializer, UserUnitSerializer
from django.shortcuts import get_object_or_404

class UnitView(APIView):
    def get(self, request):
        unit = Unit.objects.all()
        serializer = UnitSerializer(unit, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UnitSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class TopicView(APIView):
    def get(self, request):
        topic = Topic.objects.all()
        serializer = TopicSerializer(topic, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class LessonView(APIView):
    def get(self, request):
        lesson = Lesson.objects.all()
        serializer = LessonSerializer(lesson, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
class VideoSettingView(APIView):
    def get(self, request):
        videoLanguage = VideoSetting.objects.all()
        serializer = VideoSettingSerializer(videoLanguage, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = VideoSettingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_lesson_completed(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    user_lesson, created = UserLesson.objects.get_or_create(user=request.user, lesson=lesson)
    user_lesson.completed = request.data.get('completed', user_lesson.completed)
    user_lesson.save()

    user_topic = user_lesson.get_user_topic()
    user_topic.update_progression()

    user_unit = user_topic.get_user_unit()
    user_unit.update_progression()

    return Response({'status': 'success', 'message': 'Lesson completion status updated.'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_lesson(request, lesson_id):
    user_lesson = get_object_or_404(UserLesson, user=request.user, lesson_id=lesson_id)
    serializer = UserLessonSerializer(user_lesson)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_topic(request, topic_id):
    user_topic = get_object_or_404(UserTopic, user=request.user, topic_id=topic_id)
    serializer = UserTopicSerializer(user_topic)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_unit(request, unit_id):
    user_unit = get_object_or_404(UserUnit, user=request.user, unit_id=unit_id)
    serializer = UserUnitSerializer(user_unit)
    return Response(serializer.data)