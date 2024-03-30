from django.urls import path
from .views import LessonList, TopicList, VideoLanguageList

urlpatterns = [
    path('lesson/', LessonList.as_view(), name='lesson-list'),
    path('topic/', TopicList.as_view(), name='topic-list'),
    path('/video_language/', VideoLanguageList.as_view(), name='videoLangauge-list'),
]