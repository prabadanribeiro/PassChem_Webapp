from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from .models import Unit, Topic, Lesson, VideoSetting, UserTopic, UserLesson, UserUnit
from .serializers import UnitSerializer, TopicSerializer, LessonSerializer, VideoSettingSerializer, UserLessonSerializer, UserTopicSerializer, UserUnitSerializer

class UnitView(APIView):
    """
    API view to handle GET and POST requests for the Unit model.
    """

    def get(self, request):
        """
        Retrieves all Unit instances and returns serialized data.
        """
        unit = Unit.objects.all()
        serializer = UnitSerializer(unit, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Creates a new Unit instance from request data, saves it to the database, 
        and returns the serialized data upon successful creation.
        """
        serializer = UnitSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class TopicView(APIView):
    """
    API view to handle GET and POST requests for the Topic model.
    """

    def get(self, request):
        """
        Retrieves all Topic instances and returns serialized data.
        """
        topic = Topic.objects.all()
        serializer = TopicSerializer(topic, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Creates a new Topic instance from request data, saves it to the database,
        and returns the serialized data upon successful creation.
        """
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class LessonView(APIView):
    """
    API view to handle GET and POST requests for the Lesson model.
    """

    def get(self, request):
        """
        Retrieves all Lesson instances and returns serialized data.
        """
        lesson = Lesson.objects.all()
        serializer = LessonSerializer(lesson, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Creates a new Lesson instance from request data, saves it to the database,
        and returns the serialized data upon successful creation.
        """
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class VideoSettingView(APIView):
    """
    API view to handle GET and POST requests for the VideoSetting model.
    """

    def get(self, request):
        """
        Retrieves all VideoSetting instances and returns serialized data.
        """
        videoLanguage = VideoSetting.objects.all()
        serializer = VideoSettingSerializer(videoLanguage, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Creates a new VideoSetting instance from request data, saves it to the database,
        and returns the serialized data upon successful creation.
        """
        serializer = VideoSettingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_lesson_completed(request, lesson_id):
    """
    Marks a specific lesson as completed for the authenticated user.
    
    - Updates the UserLesson completion status.
    - Updates the user's progression in the associated UserTopic and UserUnit.
    
    Parameters:
        lesson_id: The ID of the Lesson to be marked completed.
    
    Returns:
        JSON response with a success message and HTTP 200 status.
    """
    user_lesson = get_object_or_404(UserLesson, user=request.user, lesson_id=lesson_id)
    user_lesson.completed = request.data.get('completed', user_lesson.completed)
    user_lesson.save()

    if user_lesson.lesson.topic:
        user_topic = user_lesson.get_user_topic()
        user_topic.update_progression()
        
        user_unit = user_topic.get_user_unit()
        user_unit.update_progression()  
    else:
        user_unit = UserUnit.objects.filter(user=request.user, unit=user_lesson.lesson.unit).first()
        user_unit.update_progression()

    return Response({'status': 'success', 'message': 'Lesson completion status updated.'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_lesson(request, lesson_id):
    """
    Retrieves the completion status of a specific lesson for the authenticated user.

    Parameters:
        lesson_id: The ID of the Lesson to retrieve completion status for.

    Returns:
        JSON serialized UserLesson data.
    """
    user_lesson = get_object_or_404(UserLesson, user=request.user, lesson_id=lesson_id)
    serializer = UserLessonSerializer(user_lesson)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_topic(request, topic_id):
    """
    Retrieves the user's progression for a specific topic.

    Parameters:
        topic_id: The ID of the Topic to retrieve progression for.

    Returns:
        JSON serialized UserTopic data.
    """
    user_topic = get_object_or_404(UserTopic, user=request.user, topic_id=topic_id)
    serializer = UserTopicSerializer(user_topic)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_unit(request, unit_id):
    """
    Retrieves the user's progression for a specific unit.

    Parameters:
        unit_id: The ID of the Unit to retrieve progression for.

    Returns:
        JSON serialized UserUnit data.
    """
    user_unit = get_object_or_404(UserUnit, user=request.user, unit_id=unit_id)
    serializer = UserUnitSerializer(user_unit)
    return Response(serializer.data)