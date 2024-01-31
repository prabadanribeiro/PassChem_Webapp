from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'List superusers in the Django project'

    def handle(self, *args, **options):
        superusers = User.objects.filter(is_superuser=True)

        if superusers.exists():
            self.stdout.write("Superusers:")
            for superuser in superusers:
                self.stdout.write(f"  - {superuser.username}")
        else:
            self.stdout.write("No superusers found.")
