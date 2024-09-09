from django.conf import settings
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from allauth.socialaccount.models import SocialAccount, SocialToken, SocialApp
from .models import User, AlternateEmail
from .serializers import UserSerializer
        
class GoogleRegistrationView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), settings.GOOGLE_CLIENT_ID)
            email = idinfo['email']
            google_id = idinfo['sub']
            user = None
            social_account = None

            if SocialAccount.objects.filter(provider='google', uid=google_id).exists():
                return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

            user, user_created = User.objects.get_or_create(email=email, defaults={
                'first_name': idinfo.get('given_name', ''),
                'last_name': idinfo.get('family_name', ''),
                'google_id': google_id,
            })

            social_account = SocialAccount(user=user, provider='google', uid=google_id)
            social_account.save()

            app = SocialApp.objects.get(provider='google')
            SocialToken.objects.update_or_create(
                account=social_account,
                app=app,
                defaults={'token': token,}
            )

            return Response({'message': 'User registered successfully'})

        except ValueError as e:
            return Response({'error': 'Invalid Google token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), settings.GOOGLE_CLIENT_ID)
            google_id = idinfo['sub']

            try:
                social_account = SocialAccount.objects.get(provider='google', uid=google_id)
                user = social_account.user

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
            
            except SocialAccount.DoesNotExist:
                return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        except ValueError as e:
            return Response({'error': 'Invalid Google token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class LinkGoogleAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.data.get('token')
        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), settings.GOOGLE_CLIENT_ID)
            google_id = idinfo['sub']

            if SocialAccount.objects.filter(provider='google', uid=google_id).exists():
                return Response({'error': 'Google account is already linked to another user'}, status=status.HTTP_400_BAD_REQUEST)

            user = request.user
            social_account = SocialAccount(user=user, provider='google', uid=google_id)
            social_account.save()

            app = SocialApp.objects.get(provider='google')
            SocialToken.objects.update_or_create(
                account=social_account,
                app=app,
                defaults={'token': token,}
            )

            return Response({'message': 'Google account linked successfully'})

        except ValueError as e:
            return Response({'error': 'Invalid Google token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class LinkEmailPasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        if User.objects.filter(email=email).exclude(id=user.id).exists():
            return Response({'error': 'This email is already in use by another account.'}, status=status.HTTP_400_BAD_REQUEST)

        if user.email == email:
            user.password = make_password(password)
            user.save()
            return Response({'message': 'Email and password linked successfully to the main account'}, status=status.HTTP_200_OK)

        if AlternateEmail.objects.filter(email=email).exists():
            return Response({'error': 'This email is already in use by another account.'}, status=status.HTTP_400_BAD_REQUEST)

        alternate_email = AlternateEmail(user=user, email=email)
        alternate_email.set_password(password)
        alternate_email.save()

        return Response({'message': 'Alternate email and password linked successfully'}, status=status.HTTP_200_OK)
    


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
            user = User.objects.get(email=email)
            if not user.check_password(password):
                raise AuthenticationFailed("Incorrect Password")
        except User.DoesNotExist:
            try:
                alternate_email = AlternateEmail.objects.get(email=email)
                user = alternate_email.user
                if not alternate_email.check_password(password):
                    raise AuthenticationFailed("Incorrect Password")
            except AlternateEmail.DoesNotExist:
                raise AuthenticationFailed("Account does not exist")

        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)

        return Response({
            "access_token": str(access_token),
            "refresh_token": str(refresh_token),
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

class UpdatePasswordView(APIView):

    def post(self, request):
        email = request.data["email"]
        new_password = request.data["new_password"]

        try:
            user = User.objects.get(email=email)
            user.set_password(new_password)
            user.save()
            return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            try:
                alternate_email = AlternateEmail.objects.get(email=email)
                alternate_email.set_password(new_password)
                alternate_email.save()
                return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
            except AlternateEmail.DoesNotExist:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class GetUserEmailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        has_google_account = SocialAccount.objects.filter(user=user, provider='google').exists()
        has_password = user.has_usable_password() and user.password != '!' and user.password != ''
        alternate_emails = AlternateEmail.objects.filter(user=user).exists()

        if has_google_account and (has_password or alternate_emails):
            auth_method = 'both'
        elif has_google_account:
            auth_method = 'google'
        else:
            auth_method = 'email/password'

        return Response({'email': user.email, 'auth_method': auth_method}, status=200)
        
class DeleteAccountView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            user = request.user

            social_account = SocialAccount.objects.filter(user=user, provider='google').first()
            if social_account:
                SocialToken.objects.filter(account=social_account).delete()
                social_account.delete()

            AlternateEmail.objects.filter(user=user).delete()

            refresh_token = RefreshToken.for_user(user)
            refresh_token.blacklist()

            user.delete()

            return Response({"message": "Account and associated tokens deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)