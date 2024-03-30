from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Topic, Lesson, VideoLanguage
from .serializers import TopicSerializer, LessonSerializer, VideoLanguageSerializer

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
        
class VideoLanaguageView(APIView):
    def get(self, request):
        videoLanguage = VideoLanguage.objects.all()
        serializer = VideoLanguageSerializer(videoLanguage, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = VideoLanguageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)