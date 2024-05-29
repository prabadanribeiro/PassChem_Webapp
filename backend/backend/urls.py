from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from django.http import HttpResponse
from passchem_api.views import *
from users.views import *
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static
from dj_rest_auth import *


urlpatterns = [
    path('', lambda request: HttpResponse('')),
    path('admin/', admin.site.urls),
    path('api/unit/', UnitView.as_view(), name='anything'),
    path('api/topic/', TopicView.as_view(), name='anything'),
    path('api/lesson/', LessonView.as_view(), name='anything'),
    path('api/video_setting/', VideoSettingView.as_view(), name='anything'),
    path('api/users/', include('users.urls'), name='anything'),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name ="token_obtain_pair"),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path('accounts/', include('allauth.urls')),
    path('mark_lesson_completed/<int:lesson_id>/', mark_lesson_completed, name='mark_lesson_completed'),
    path('user_lesson/<int:lesson_id>/', get_user_lesson, name='get_user_lesson'),
    path('user_topic/<int:topic_id>/', get_user_topic, name='get_user_topic'),
    path('user_unit/<int:unit_id>/', get_user_unit, name='get_user_unit'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
