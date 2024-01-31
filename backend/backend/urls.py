from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from topics.views import *

urlpatterns = [
    path('', lambda request: HttpResponse('')),
    path('admin/', admin.site.urls),
    path('topics/', TopicsView.as_view(), name='anything'),
    path('lesson/', LessonView.as_view(), name='anything')
]
