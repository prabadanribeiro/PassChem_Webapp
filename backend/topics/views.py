from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Topics, Lesson
from .serializers import TopicsSerializer, LessonSerializer

class TopicsView(APIView):
    def get(self, request):
        topics = Topics.objects.all()
        serializer = TopicsSerializer(topics, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TopicsSerializer(data=request.data)
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