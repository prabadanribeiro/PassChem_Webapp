from django.urls import path
from .views import LessonList, TopicList, VideoLanguageList

urlpatterns = [
    path('api/lesson/', LessonList.as_view(), name='lesson-list'),
    path('api/topic/', TopicList.as_view(), name='topic-list'),
    path('api/video_language/', VideoLanguageList.as_view(), name='videoLangauge-list'),
]