from django.urls import path
from .views import UnitList, LessonList, TopicList, VideoSettingList
from .views import mark_lesson_completed, get_user_lesson, get_user_topic, get_user_unit

urlpatterns = [
    path('unit/', UnitList.as_view(), name='unit-list'),
    path('lesson/', LessonList.as_view(), name='lesson-list'),
    path('topics/', TopicList.as_view(), name='topic-list'),
    path('video_setting/', VideoSettingList.as_view(), name='videoLangauge-list'),
    path('mark_lesson_completed/<int:lesson_id>/', mark_lesson_completed, name='mark_lesson_completed'),
    path('user_lesson/<int:lesson_id>/', get_user_lesson, name='get_user_lesson'),
    path('user_topic/<int:topic_id>/', get_user_topic, name='get_user_topic'),
    path('user_unit/<int:unit_id>/', get_user_unit, name='get_user_unit'),
]