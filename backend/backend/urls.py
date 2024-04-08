from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from django.http import HttpResponse
from api.views import *
from users.views import *
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', lambda request: HttpResponse('')),
    path('admin/', admin.site.urls),
    path('api/topic/', TopicView.as_view(), name='anything'),
    path('api/lesson/', LessonView.as_view(), name='anything'),
    path('api/video_language/', VideoLanaguageView.as_view(), name='anything'),
    path('api/users/', include('users.urls'), name='anything'),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name ="token_obtain_pair"),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
