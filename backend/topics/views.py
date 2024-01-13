from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Topics, Lesson
from .serializers import TopicsSerializer, LessonSerializer

class TopicsView(APIView):
    def get(self, request):
        output = [{'title': output.title,
                #   ADD IMG
                   'unit': output.unit}
                   for output in Topics.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = TopicsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
class LessonView(APIView):
    def get(self, request):
        output = [{'topic': output.topic,
            'title': output.title,
            'type': output.type,
            'video_url': output.video_url,
            'documents': output.documents}
            for output in Lesson.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)