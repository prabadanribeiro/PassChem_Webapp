from django.urls import path
from .views import LessonList, TopicsList, VideoLanguageList

urlpatterns = [
    path('lesson/', LessonList.as_view(), name='lesson-list'),
    path('topics/', TopicsList.as_view(), name='topic-list'),
    path('/video_language', VideoLanguageList.as_view(), name='videoLangauge-list'),
]