from django.contrib import admin
from django.urls import path
from topics.views import *

urlpatterns = [ # PROBLEM IS PROBABLY HERE
    path('admin/', admin.site.urls),
    path('', TopicsView.as_view(), name='anything')
]
