from django.contrib import admin
from .models import User, AlternateEmail

admin.site.register(User)
admin.site.register(AlternateEmail)