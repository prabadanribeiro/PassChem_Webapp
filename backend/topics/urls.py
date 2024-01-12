from django.urls import path
from .views import LessonList, TopicsList

urlpatterns = [
    path('lesson/', LessonList.as_view(), name='lesson-list'),
    path('topics/', TopicsList.as_view(), name='topic-list'),
]