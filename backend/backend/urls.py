from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from api.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', lambda request: HttpResponse('')),
    path('admin/', admin.site.urls),
    path('topic/', TopicView.as_view(), name='anything'),
    path('lesson/', LessonView.as_view(), name='anything'),
    path('video_language/', VideoLanaguageView.as_view(), name='anything'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # THIS DOES NOT WORK FOR PRODUCTION, USE AWS
