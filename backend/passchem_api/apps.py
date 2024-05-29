from django.apps import AppConfig

class PasschemApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'passchem_api'

    def ready(self):
            import passchem_api.signals
