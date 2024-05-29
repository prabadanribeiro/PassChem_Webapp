from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from rest_framework.permissions import AllowAny
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from allauth.socialaccount.models import SocialAccount, SocialToken, SocialApp
from .models import User
from .serializers import UserSerializer

class GoogleLoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), settings.GOOGLE_CLIENT_ID)
            email = idinfo['email']
            user = None
            social_account = None

            try:
                social_account = SocialAccount.objects.get(provider='google', uid=idinfo['sub'])
                user = social_account.user
            except SocialAccount.DoesNotExist:
                user, user_created = User.objects.get_or_create(email=email, defaults={
                    'first_name': idinfo.get('given_name', ''),
                    'last_name': idinfo.get('family_name', ''),
                })
                social_account = SocialAccount(user=user, provider='google', uid=idinfo['sub'])
                social_account.save()

            app = SocialApp.objects.get(provider='google')

            SocialToken.objects.update_or_create(
                account=social_account,
                app=app,
                defaults={'token': token,}
            )

            access_token = AccessToken.for_user(user)
            refresh_token = RefreshToken.for_user(user)
            
            return Response({
                'access_token': str(access_token),
                'refresh_token': str(refresh_token),
            })
        
        except ValueError as e:
            return Response({'error': 'Invalid Google token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class LoginView(APIView):

    def post(self, request):

        email = request.data["email"]
        password = request.data["password"]
        
        try:
            user = User.objects.get(email = email)
        except User.DoesNotExist:
            raise AuthenticationFailed("Account does not exist")
        if user is None:
            raise AuthenticationFailed("User does not exist")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")
        
        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)

        return Response({
            "access_token" : access_token,
            "refresh_token" : refresh_token,
        })
    
class LogoutView(APIView):

    def post(self, request):
        
        try:
            refresh_token = request.data['refresh_token']
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response("Logout Successful", status=status.HTTP_200_OK)
        
        except TokenError:
            raise AuthenticationFailed("Invalid Token")
