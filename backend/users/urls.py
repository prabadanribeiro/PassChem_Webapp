from django.urls import path, include
from users.views import RegisterView, LoginView, LogoutView, GoogleLoginView, UpdatePasswordView, GetUserEmailView, DeleteAccountView, GoogleRegistrationView, LinkGoogleAccountView, LinkEmailPasswordView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name = "logout"),
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('google-register/', GoogleRegistrationView.as_view(), name='google-register'),
    path('link-google-account/', LinkGoogleAccountView.as_view(), name='link-google-account'),
    path('link-email-password/', LinkEmailPasswordView.as_view(), name='link-email-password'),
    path('update-password/', UpdatePasswordView.as_view(), name='update-password'),
    path('get-email/', GetUserEmailView.as_view(), name='get-email'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]